import { NextResponse } from "next/server";
import { meetings } from "../../../../lib/mockData";

export function GET(_request: Request, { params }: { params: { id: string } }) {
  const meeting = meetings.find((item) => item.id === params.id);

  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }

  return NextResponse.json({ data: meeting });
}
