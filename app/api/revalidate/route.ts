import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// This is the handler for our secret API route
export async function GET(request: NextRequest) {
  // 1. Check for the secret token in the URL query parameters
  const token = request.nextUrl.searchParams.get('token')

  // 2. Compare it to the secret token stored in our environment variables
  if (token !== process.env.REVALIDATION_TOKEN) {
    // If the tokens don't match, this is an unauthorized request
    return new Response('Invalid token', { status: 401 })
  }

  // 3. If the token is valid, we revalidate the data for our pages
  //    This tells Next.js to fetch fresh data for these paths
  try {
    revalidatePath('/') // Revalidate the homepage
    revalidatePath('/orgs') // Revalidate the organizations page
    // We can also add revalidation for individual playbook pages if needed
    // revalidatePath('/playbook/[slug]', 'layout')
    
    console.log("Successfully revalidated paths!");
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error("Error revalidating:", err);
    return new Response('Error revalidating', { status: 500 })
  }
}