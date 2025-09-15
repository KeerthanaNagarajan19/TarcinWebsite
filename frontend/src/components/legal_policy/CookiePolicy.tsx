import React from "react";

const CookiePolicy: React.FC = () => {
  const faqItems = [
    {
      question: "What are cookies?",
      answer: `Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.

Cookies set by the website owner (in this case, Tarcin Robotic LLP) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.`,
    },
    {
      question: "Why do we use cookies?",
      answer: `We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.`,
    },
    {
      question: "How can I control cookies?",
      answer: `You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.

The Cookie Consent Manager can be found in the notification banner and on our Website. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.`,
    },
    {
      question: "What about other tracking technologies, like web beacons?",
      answer: `Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them. This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto my-10 px-6 py-8 bg-slate-50 rounded-lg font-sans text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        COOKIE POLICY
      </h1>

      <p className="mb-8 whitespace-pre-wrap">
        Last updated May 23, 2025

        This Cookie Policy explains how Tarcin Robotic LLP ("Company," "we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website at https://tarcin.in ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.

        In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
      </p>

      {faqItems.map(({ question, answer }, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2 select-none cursor-default">
            {question}
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
        </div>
      ))}

      <div className="mt-10 text-gray-700 whitespace-pre-wrap">
        <p className="mb-4">
          <strong>Performance and functionality cookies:</strong> These cookies
          are used to enhance the performance and functionality of our Website
          but are non-essential to their use. However, without these cookies,
          certain functionality (like videos) may become unavailable.
        </p>
        <p className="mb-2">
          <strong>Name:</strong> VISITOR_PRIVACY_METADATA
        </p>
        <p className="mb-2">
          <strong>Purpose:</strong> to store the user's cookie consent state for the current domain
        </p>
        <p className="mb-2">
          <strong>Provider:</strong> .youtube.com
        </p>
        <p className="mb-2">
          <strong>Service:</strong> Youtube View Service Privacy Policy
        </p>
        <p className="mb-2">
          <strong>Type:</strong> server_cookie
        </p>
        <p>
          <strong>Expires in:</strong> 5 months 27 days
        </p>
      </div>
    </div>
  );
};

export default CookiePolicy;
