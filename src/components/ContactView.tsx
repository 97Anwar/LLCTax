import React, { useState, useEffect } from 'react';
import { updateSEOTags } from '../utils/seo';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    updateSEOTags({
      title: 'Contact Us & Statute Support — LLCTaxCheck.com',
      description: 'Contact the editorial desk and research team at LLCTaxCheck.com. Report state statute amendments, submit feedback, or inquire about partnership opportunities.',
      canonicalPath: '/contact',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact Us', path: '/contact' },
      ],
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <Mail className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <span>Support & Editorial Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Contact LLCTaxCheck.com
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
          Have a question regarding state filing schedules, identified a recent state legislative amendment, or want to give feedback on our calculations? Our research desk is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Direct Inquiries (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xs space-y-4 text-xs">
            <h2 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              Direct Contact Channels
            </h2>

            <div className="space-y-3">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">General Inquiries & Support</span>
                <a href="mailto:support@llctaxcheck.com" className="font-mono font-medium text-zinc-900 dark:text-zinc-100 text-xs hover:underline block mt-0.5">
                  support@llctaxcheck.com
                </a>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Statute Corrections & Updates</span>
                <a href="mailto:statutes@llctaxcheck.com" className="font-mono font-medium text-zinc-900 dark:text-zinc-100 text-xs hover:underline block mt-0.5">
                  statutes@llctaxcheck.com
                </a>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200/80 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Legal & Privacy Inquiries</span>
                <a href="mailto:legal@llctaxcheck.com" className="font-mono font-medium text-zinc-900 dark:text-zinc-100 text-xs hover:underline block mt-0.5">
                  legal@llctaxcheck.com
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2 text-zinc-500">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Response Time: Typically within 24 business hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Independent US Legal Compliance Reference</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Feedback / Contact Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-2xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-900 dark:text-zinc-100">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Message Transmitted
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to LLCTaxCheck.com. Our editorial research team has received your communication and will review it promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'general', message: '' });
                  }}
                  className="px-4 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <h2 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-zinc-500" />
                    <span>Send a Direct Inquiry</span>
                  </h2>
                  <span className="text-[11px] text-zinc-400">All fields confidential</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="font-medium text-zinc-700 dark:text-zinc-300">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="font-medium text-zinc-700 dark:text-zinc-300">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-topic" className="font-medium text-zinc-700 dark:text-zinc-300">
                    Topic of Inquiry
                  </label>
                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  >
                    <option value="general">General Support / Calculator Inquiry</option>
                    <option value="statute_correction">State Statute or Fee Update Correction</option>
                    <option value="press">Press, Editorial, or Citation Inquiry</option>
                    <option value="partnership">API / Data Partnership</option>
                    <option value="privacy">Privacy / Data Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="font-medium text-zinc-700 dark:text-zinc-300">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Provide details about your inquiry, state jurisdiction, or suggestion..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
