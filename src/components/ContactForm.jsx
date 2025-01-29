import React, { useState } from 'react';
import Map from './map';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First email - to the user
      const test = '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';
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': test
        },
        body: JSON.stringify({
          sender: { email: 'server@technoservesolutions.com' },
          to: [{ email: formData.email }],
          subject: 'Thank you for your inquiry on Sadaqah Online',
          htmlContent: `
            <h1>Thank you for your inquiry on Sadaqah Online!</h1>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <h3>Submitted Details Below</h3>
            <p>First Name: ${formData.firstName}</p>
            <p>Last Name: ${formData.lastName}</p>
            <p>Email: ${formData.email}</p>
            <p>Phone: ${formData.phone}</p>
            <p>Details: ${formData.details}</p>
          `
        })
      });

      // Second email - to admin
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': test
        },
        body: JSON.stringify({
          sender: { email: 'server@technoservesolutions.com' },
          to: [{ email: 'daniyalahs8@gmail.com' }],
          subject: 'Sadaqah Online Inquiry Submission',
          htmlContent: `
            <h1>Sadaqah Online Inquiry Submission:</h1>
            <p>First Name: ${formData.firstName}</p>
            <p>Last Name: ${formData.lastName}</p>
            <p>Email: ${formData.email}</p>
            <p>Phone: ${formData.phone}</p>
            <p>Details: ${formData.details}</p>
          `
        })
      });

      alert('Inquiry sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        details: ''
      });
    } catch (error) {
      alert('Error sending inquiry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="max-w-2xl lg:max-w-5xl mx-auto">
        <div className="mt-12 grid lg:grid-cols-2 gap-6 lg:gap-16">
          {/* Form Card */}
          <div className="flex flex-col border border-gray-800 rounded-xl p-4 sm:p-6 lg:p-8">
            <h2 className="mb-8 text-xl font-semibold text-gray-800">Fill in the form</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full border border-gray-800 rounded-lg text-sm focus:border-[#02343f]"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full border border-gray-800 rounded-lg text-sm focus:border-[#02343f]"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border border-gray-800 rounded-lg text-sm focus:border-[#02343f]"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border border-gray-800 rounded-lg text-sm focus:border-[#02343f]"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div>
                  <textarea
                    id="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows="4"
                    className="py-3 px-4 block w-full border border-gray-800 rounded-lg text-sm focus:border-[#02343f]"
                    placeholder="Details"
                  />
                </div>
              </div>

              <div className="mt-4 grid">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-sm font-medium rounded-lg bg-[#02343f] text-white hover:bg-[#022b35] disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Sending...' : 'Send inquiry'}
                </button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-sm text-gray-500">
                  We'll get back to you in 1-2 business days.
                </p>
              </div>
            </form>
          </div>

          {/* Google Maps */}
          <Map/>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;