import React from 'react';
import ContactUsForm from '../../../common/ContactUsForm';

export default function ContactFormSection() {
  return (
    <div className='mx-auto max-w-4xl p-6'>
      <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>
        Get in Touch
      </h1>
      <p className='text-lg text-center text-gray-600 mb-8'>
        We'd love to hear from you! Please fill out this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
}
