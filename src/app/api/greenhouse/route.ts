// import { NextRequest, NextResponse } from "next/server";
// import { Readable } from "stream";

// const GREENHOUSE_API_KEY = process.env.GREENHOUSE_API_KEY!;
// const JOB_ID = process.env.JOB_ID;

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const first_name = formData.get("first_name") as string;
//     const last_name = formData.get("last_name") as string;
//     const email = formData.get("email") as string;
//     const phone = formData.get("phone") as string;
//     const resume = formData.get("resume") as File;

//     if (!first_name || !last_name || !email || !phone || !resume) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const resumeBuffer = Buffer.from(await resume.arrayBuffer());

//     const greenhouseForm = new FormData();
//     greenhouseForm.append("first_name", first_name);
//     greenhouseForm.append("last_name", last_name);
//     greenhouseForm.append("email", email);
//     greenhouseForm.append("phone", phone);
//     greenhouseForm.append(
//       "resume",
//       new Blob([resumeBuffer], { type: resume.type }),
//       resume.name
//     );

//     const response = await fetch("https://boards-api.greenhouse.io/v1/boards/4280249007/jobs/4285367007/applications", {
//       method: "POST",
//       // headers: {
//       //   Authorization: `Basic ${Buffer.from(`${GREENHOUSE_API_KEY}:`).toString("base64")}`,
//       // },
//       headers: {
//         Authorization: `Basic ${Buffer.from(`${process.env.GREENHOUSE_API_KEY}:`).toString("base64")}`,
//       },
//       body: greenhouseForm,
//     });

//     const rawText = await response.text();
//     let result;
//     try {
//       result = JSON.parse(rawText);
//     } catch {
//       result = rawText;
//     }
    

//     if (!response.ok) {
//       console.error("Greenhouse error response:", result);
//       return NextResponse.json({ error: result }, { status: response.status });
//     }

//     return NextResponse.json(result);
//   } catch (error: any) {
//     console.error("Unhandled error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const resume = formData.get("resume");

    console.log("Mocked Submission Received:");
    console.log({ firstName, lastName, email, phone, resume });

    // Simulate success response
    return NextResponse.json(
      {
        message: "Mocked submission successful!",
        data: {
          firstName,
          lastName,
          email,
          phone,
          resumeName: resume && typeof resume === "object" ? resume.name : null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Mocked submission error:", error);
    return NextResponse.json({ error: "Mocked submission failed" }, { status: 500 });
  }
}
