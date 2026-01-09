import { NextResponse } from "next/server";
import { meetings } from "../../../lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const results = meetings.filter((meeting) =>
    [meeting.title, meeting.summary.headline, meeting.tags.join(" ")].some((value) =>
      value.toLowerCase().includes(query)
    )
  );

  return NextResponse.json({ data: results, query });
}
