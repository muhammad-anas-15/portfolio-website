import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiLoader } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  // 1. Setup Form Ref and State
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // 2. The Email Sending Function
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // 1. Prepare the data manually (This often bypasses connection blocks)
    const templateParams = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: form.current.message.value,
    };

    // ⚠️ REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
    // Service ID, Template ID, Public Key
    emailjs
      .sendForm(
        "service_d3wxdth",    
        "template_39ulbti",   
        form.current,
        "NN9ZxD2dmoHmrUHtr"     
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSending(false);
          setIsSent(true);
          e.target.reset(); // Clear the form
          setTimeout(() => setIsSent(false), 5000); // Reset success status after 5s
        },
        (error) => {
          console.log(error.text);
          setIsSending(false);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  // Data for the Right Side
  const contactDetails = [
    {
      id: "email",
      icon: <FiMail />,
      title: "Email",
      text: "muhammadannas.2356@gmail.com",
      color: "text-[#EA4335]", 
      bgHover: "group-hover:bg-[#EA4335]",
      iconHover: "group-hover:text-white",
      textHover: "group-hover:text-[#EA4335]"
    },
    {
      id: "linkedin",
      icon: <FiLinkedin />,
      title: "LinkedIn",
      text: "linkedin.com/in/muhammad-anaspk",
      href: "https://www.linkedin.com/in/muhammad-anaspk/",
      color: "text-[#0077B5]", 
      bgHover: "group-hover:bg-[#0077B5]",
      iconHover: "group-hover:text-white",
      textHover: "group-hover:text-[#0077B5]"
    },
    {
      id: "github",
      icon: <FiGithub />,
      title: "GitHub",
      text: "github.com/muhammad-anas-15",
      href: "https://github.com/muhammad-anas-15",
      color: "text-white", 
      bgHover: "group-hover:bg-black", 
      iconHover: "group-hover:text-white",
      textHover: "group-hover:text-white"
    }
  ];

  return (
    <section id="contact" className="relative py-12 w-full overflow-hidden bg-black/30 backdrop-blur-sm min-h-screen flex flex-col justify-center">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] -translate-y-1/2 -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] translate-x-1/2 -z-10" />

      {/* CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
            Get In <span className="text-brand-cyan">Touch</span>
          </h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-brand-cyan to-brand-purple rounded-full mx-auto"></div>
          <p className="text-gray-400 text-lg mt-4">Let's collaborate on your next big project</p>
        </motion.div>

        {/* TWO COLUMNS LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start"> 

          {/* --- LEFT COLUMN: The Form --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group w-full h-full"
          >
            {/* BORDER ANIMATION */}
            <div className="absolute -inset-px rounded-4xl bg-linear-to-r from-brand-cyan via-brand-purple to-brand-cyan opacity-50 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-gradient-xy"></div>

            {/* The Card Itself */}
            <div className="relative bg-[#161618]/90 backdrop-blur-xl rounded-4xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden h-full flex flex-col justify-center">
              
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text"
                    name="user_name"  
                    required 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    name="user_email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                  <textarea 
                    rows="5"
                    name="message"    
                    required 
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all duration-300 resize-none"
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 
                    ${isSent ? "bg-green-500 text-white" : "bg-linear-to-r from-brand-cyan to-brand-purple text-white hover:shadow-[0_0_20px_rgba(0,188,212,0.6)]"}`}
                >
                  {isSending ? (
                    <><FiLoader className="animate-spin" /> Sending...</>
                  ) : isSent ? (
                    <><FiCheckCircle /> Message Sent!</>
                  ) : (
                    <><FiSend /> Send Message</>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5 justify-center h-full"
          >
            <div className="mb-4">
               <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Let's Talk</h3>
               <p className="text-gray-400 text-lg leading-relaxed">
                 I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
               </p>
            </div>

            {contactDetails.map((item, i) => {
              const isEmail = item.id === "email";
              const Wrapper = isEmail ? motion.div : motion.a;
              const linkProps = isEmail ? {} : { href: item.href, target: "_blank", rel: "noopener noreferrer" };

              return (
                <Wrapper 
                  key={i}
                  {...linkProps}
                  className={`relative group block w-full ${!isEmail ? 'cursor-pointer' : 'cursor-default'}`}
                  whileHover={!isEmail ? { x: 10 } : {}}
                >
                  <div className="absolute -inset-1px rounded-2xl bg-linear-to-r from-brand-cyan via-brand-purple to-brand-cyan opacity-0 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-gradient-xy"></div>
                  <div className="relative glass-card p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 bg-[#161618] border border-white/10 group-hover:border-transparent">
                    <div className={`shrink-0 p-3 rounded-xl bg-white/5 ${item.color} text-2xl ${item.bgHover} ${item.iconHover} transition-all duration-300 shadow-lg`}>
                      {item.icon}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className={`text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 ${item.textHover || "group-hover:text-brand-cyan"} transition-colors`}>
                        {item.title}
                      </h4>
                      <p className="text-white text-sm md:text-base font-medium truncate w-full leading-relaxed select-all">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;