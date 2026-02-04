import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Contact from '@/models/Contact';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { firstName, lastName, email, acceptedTerms } = await request.json();

    if (!firstName || !lastName || !email || acceptedTerms === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!acceptedTerms) {
      return NextResponse.json(
        { error: 'You must accept the terms and conditions' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 200 }
      );
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      acceptedTerms,
    });

    await newContact.save();

    return NextResponse.json(
      { message: 'Thank you for subscribing!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
