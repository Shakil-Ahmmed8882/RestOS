export type CategoryCacheRow = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  imagePublicId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const isObject = (v: unknown): v is Record<string, any> =>
  Boolean(v) && typeof v === "object";

/**
 * Normalise a server payload into a row consumed by the UI.
 *
 * Accepts both pre-unwrapped objects (`{ _id, name, ... }`) and full
 * envelopes (`{ data: { createdCategory: [{...}] } }`, `{ data: { ... } }`,
 * `{ data: { updatedFoodData: { ... } } }`). Keeping the shape-tolerance
 * here means modal sections don't repeat unwrap logic.
 */
export function normalizeCategory(input: unknown): CategoryCacheRow | null {
  if (!isObject(input)) return null;

  const root = input;
  // unwrap envelope -> data
  const data = isObject(root.data) ? root.data : root;

  // server returns Model.create([...]) for create
  if (Array.isArray((data as any).createdCategory)) {
    const first = (data as any).createdCategory[0];
    return toRow(first);
  }
  // server returns { updatedFoodData, img } for update
  if (isObject((data as any).updatedFoodData)) {
    return toRow((data as any).updatedFoodData);
  }
  // server returns { deletedCategory } for delete
  if (isObject((data as any).deletedCategory)) {
    return toRow((data as any).deletedCategory);
  }
  return toRow(data);
}

function toRow(raw: any): CategoryCacheRow | null {
  if (!raw?._id) return null;
  return {
    _id: String(raw._id),
    name: raw.name,
    description: raw.description,
    image: raw.image,
    imagePublicId: raw.imagePublicId,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}
