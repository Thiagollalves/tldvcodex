import { NextResponse } from "next/server";
import { meetings } from "../../../lib/mockData";

export function GET() {
  return NextResponse.json({ data: meetings });
}
