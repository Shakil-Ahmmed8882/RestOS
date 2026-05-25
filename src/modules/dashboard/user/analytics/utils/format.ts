export const fmtBDT = (n: number | null | undefined) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(n ?? 0));

export const fmtCount = (n: number | null | undefined) =>
  new Intl.NumberFormat("en-BD").format(Number(n ?? 0));

export const fmtShortDate = (iso: string | null | undefined) => {
  if (!iso) return "";
  return iso.slice(5);
};
