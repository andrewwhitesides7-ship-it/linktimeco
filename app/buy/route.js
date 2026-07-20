import { redirect } from "next/navigation";
import { CHECKOUT_URL } from "../../lib/config";

export function GET() {
  redirect(CHECKOUT_URL);
}
