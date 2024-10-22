"use client"

const faqData = [
    {
        question: 'How do I create an account on SkillConnect?',
        answer:
            'To create an account on SkillConnect, click the "Sign Up" button on the top right corner. Fill in your details and verify your email to get started.',
    },
    {
        question: 'How can I hire a freelancer?',
        answer:
            'To hire a freelancer, browse through our categories or use the search bar to find suitable freelancers. You can view their profiles, check reviews, and contact them to discuss your project.',
    },
    {
        question: 'What payment methods are accepted?',
        answer:
            'SkillConnect accepts payments through credit/debit cards, PayPal, and bank transfers. Our platform ensures secure transactions for both clients and freelancers.',
    },
    {
        question: 'Is there a fee for freelancers?',
        answer:
            'Yes, SkillConnect charges a small commission fee on each successful transaction. The fee helps us maintain the platform and provide quality services.',
    },
    {
        question: 'How can I ensure the quality of work?',
        answer:
            'You can check freelancers’ portfolios, ratings, and reviews. Additionally, SkillConnect offers milestone payments, allowing you to release funds only when you’re satisfied with the work.',
    },
];

const Faq = () => {
    const toggleFAQ = (event) => {
        const target = event.currentTarget.nextElementSibling;
        target.classList.toggle('hidden');
        target.classList.toggle('block');
    };

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-10">
                <h1 className="text-4xl font-bold text-center text-violet-800 mb-8">Frequently Asked Questions</h1>
                <div className="bg-white shadow-2xl rounded-lg p-6 md:p-10">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                className="w-full text-left py-4 flex justify-between items-center text-gray-800 hover:bg-violet-100 transition duration-200 ease-in-out"
                                onClick={toggleFAQ}
                            >
                                <span className="text-xl font-bold">{faq.question}</span>
                                <svg
                                    className="w-6 h-6 transform transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="hidden px-4 pb-4 text-gray-700 text-md leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
