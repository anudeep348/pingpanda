import { z } from "zod"

export const CATEGORY_NAME_VALIDATOR = z
  .string()
  .min(1, "Name required")
  .regex(
    /^[a-zA-Z0-9-]+$/,
    "Category name must only contain letters, numbers or hypens."
  )
