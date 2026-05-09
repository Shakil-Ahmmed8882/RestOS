"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShowIf } from "@/components/common/ShowIf";
import { checkoutSchema, type CheckoutInput } from "@/modules/checkout/schemas/checkout.schema";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/slices/cartSlice";
import { useCreateOrderMutation } from "@/redux/featureApi/orderApi";

export function CheckoutForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const user = useAppSelector((s) => s.auth.user);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: user?.name ?? "", paymentMethod: "card" },
  });

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data: CheckoutInput) => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    const toastId = toast.loading("Placing your order…");
    try {
      await createOrder({
        userId: user?.id,
        items: items.map((i) => ({ foodId: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        contact: data,
        amounts: { subtotal, deliveryFee, tax, total },
      } as any).unwrap();
      dispatch(clearCart());
      toast.success("Order placed! 🎉", { id: toastId });
      router.push("/user/dashboard/orderlist");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to place order.", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <Card className="space-y-5 p-6">
        <h2 className="text-lg font-semibold">Delivery details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" {...register("name")} />
            <ShowIf condition={!!errors.name}>
              <p className="text-xs text-destructive">{errors.name?.message}</p>
            </ShowIf>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
            <ShowIf condition={!!errors.phone}>
              <p className="text-xs text-destructive">{errors.phone?.message}</p>
            </ShowIf>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} />
            <ShowIf condition={!!errors.city}>
              <p className="text-xs text-destructive">{errors.city?.message}</p>
            </ShowIf>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            <ShowIf condition={!!errors.address}>
              <p className="text-xs text-destructive">{errors.address?.message}</p>
            </ShowIf>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" rows={3} {...register("notes")} />
          </div>
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Payment</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["card", "cash"] as const).map((m) => (
            <label
              key={m}
              className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-sm ${
                paymentMethod === m ? "border-primary bg-primary/5" : "border-input"
              }`}
            >
              <input type="radio" value={m} {...register("paymentMethod")} className="sr-only" />
              <Icon icon={m === "card" ? "solar:card-2-linear" : "solar:wallet-money-linear"} className="h-5 w-5" />
              <span className="font-medium capitalize">{m === "card" ? "Card on delivery" : "Cash on delivery"}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="text-lg font-semibold">Your order</h2>
        <div className="space-y-2 text-sm">
          {items.map((it) => (
            <div key={it.id} className="flex justify-between gap-2">
              <span className="line-clamp-1">{it.name} × {it.quantity}</span>
              <span>${(it.price * it.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
        </div>
        <Separator />
        <div className="flex justify-between text-base font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
        <Button type="submit" size="lg" className="w-full" loading={isLoading}>
          Place order
        </Button>
      </Card>
    </form>
  );
}
