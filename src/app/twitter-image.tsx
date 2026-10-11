import { ImageResponse } from "next/og";
import {
  SocialCardContent,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_SIZE,
} from "@/components/shared/SocialCardContent";

export const runtime = "nodejs";
export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<SocialCardContent />, { ...size });
}
