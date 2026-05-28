import { Link } from "react-router-dom";

function Homepage() {
  const features = [
    {
      title: "Supplier Management",
      desc: "Manage supplier records with full CRUD operations including contact details, addresses, and supplier codes for all your supply chain partners.",
    },
    {
      title: "Shipment Tracking",
      desc: "Track shipments by number, date, status, and destination with end-to-end visibility across the entire supply chain network.",
    },
    {
      title: "Delivery Management",
      desc: "Monitor deliveries with quantity tracking, real-time status updates, and automated delivery code management.",
    },
    {
      title: "Analytics & Reports",
      desc: "Visualize supply chain data with interactive charts, status breakdowns, and comprehensive summary statistics.",
    },
    {
      title: "Secure Access",
      desc: "Role-based authentication system ensuring only authorized users access sensitive supply chain data and operations.",
    },
    {
      title: "Responsive Dashboard",
      desc: "Fully responsive supply chain dashboard that works seamlessly across desktop, tablet, and mobile devices.",
    },
  ];

  const contracts = [
    { label: "Active Supplier Contracts", value: "50+" },
    { label: "Shipments Delivered", value: "200+" },
    { label: "Completed Deliveries", value: "150+" },
    { label: "System Uptime", value: "99.9%" },
  ];

  const techStack = [
    { name: "React 19", role: "Frontend Framework" },
    { name: "Node.js", role: "Runtime Environment" },
    { name: "Express", role: "Backend API" },
    { name: "MongoDB", role: "Database" },
    { name: "Tailwind CSS", role: "Styling" },
    { name: "Recharts", role: "Data Visualization" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white/95 backdrop-blur border-b border-orange-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-orange-500">SCMS</span>
              <span className="hidden sm:inline text-sm text-gray-400 border-l border-gray-300 pl-3">
                Supply Chain Management System
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-orange-500 font-semibold text-sm">Home</Link>
              <a href="#services" className="text-gray-600 hover:text-orange-500 font-medium text-sm transition">Services</a>
              <a href="#about" className="text-gray-600 hover:text-orange-500 font-medium text-sm transition">About</a>
              <a href="#support" className="text-gray-600 hover:text-orange-500 font-medium text-sm transition">Support</a>
              <a href="#contact" className="text-gray-600 hover:text-orange-500 font-medium text-sm transition">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-gray-600 hover:text-orange-500 font-medium px-4 py-2 text-sm transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
              >
                Get Started
              </Link>
            </div>
          </div>
          {/* Mobile nav */}
          <div className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
            <Link to="/" className="text-orange-500 font-semibold text-sm whitespace-nowrap">Home</Link>
            <a href="#services" className="text-gray-600 hover:text-orange-500 font-medium text-sm whitespace-nowrap transition">Services</a>
            <a href="#about" className="text-gray-600 hover:text-orange-500 font-medium text-sm whitespace-nowrap transition">About</a>
            <a href="#support" className="text-gray-600 hover:text-orange-500 font-medium text-sm whitespace-nowrap transition">Support</a>
            <a href="#contact" className="text-gray-600 hover:text-orange-500 font-medium text-sm whitespace-nowrap transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero with office background */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1528820624198-03cf9845bec0?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block bg-orange-500/90 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Supply Chain Management System
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Streamline Your{" "}
            <span className="text-orange-400">Supply Chain</span>
            <br />
            From Source to Delivery
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            A comprehensive supply chain management platform for managing suppliers,
            tracking shipments, monitoring deliveries, and generating actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition shadow-lg shadow-orange-500/30"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="bg-white/10 backdrop-blur border-2 border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-4">
              Our Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              End-to-end supply chain solutions tailored for your business needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition duration-300"
              >
                <div className="w-8 h-1 bg-orange-500 rounded-full mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Stats */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {contracts.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-4">
              About Supply Chain Management System
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg">
              SCMS is a modern, full-stack supply chain management solution built to simplify
              how businesses track and manage their suppliers, shipments, and deliveries.
              With a clean three-tier architecture and an intuitive interface, we empower
              supply chain teams to make data-driven decisions and keep operations running smoothly.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-6">
              <div className="text-orange-500 font-semibold text-sm mb-2">PRESENTATION TIER</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">React SPA</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-orange-400">→</span> Supply chain dashboard UI</li>
                <li className="flex items-center gap-2"><span className="text-orange-400">→</span> Client-side routing</li>
                <li className="flex items-center gap-2"><span className="text-orange-400">→</span> Recharts analytics</li>
                <li className="flex items-center gap-2"><span className="text-orange-400">→</span> Tailwind CSS styling</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl p-6">
              <div className="text-gray-500 font-semibold text-sm mb-2">APPLICATION TIER</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Node.js / Express API</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-gray-400">→</span> Supply chain RESTful endpoints</li>
                <li className="flex items-center gap-2"><span className="text-gray-400">→</span> CRUD operations</li>
                <li className="flex items-center gap-2"><span className="text-gray-400">→</span> Auth & validation</li>
                <li className="flex items-center gap-2"><span className="text-gray-400">→</span> Error handling</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-6">
              <div className="text-orange-500 font-semibold text-sm mb-2">DATA TIER</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">MongoDB</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-orange-400">→</span> Supply chain data schemas</li>
                <li className="flex items-center gap-2"><span className="text-orange-400">→</span> Mongoose ODM</li>
                <li className="flex items-center gap-2"><span className="text-orange-400">→</span> Reliable data store</li>
                <li className="flex items-center gap-2"><span className="text-orange-400">→</span> Scalable queries</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A robust tech stack powering a seamless supply chain experience.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="bg-gray-800 border border-gray-700 rounded-lg p-5 text-center hover:border-orange-500/50 transition"
              >
                <div className="text-white font-semibold text-sm mb-1">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-4">
              Supply Chain Support
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              We are here to help you manage your supply chain every step of the way.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <svg className="w-10 h-10 mx-auto mb-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-500 text-sm">Comprehensive supply chain guides and API references to get you started quickly.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <svg className="w-10 h-10 mx-auto mb-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-500 text-sm">Chat with our supply chain experts in real-time during business hours.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <svg className="w-10 h-10 mx-auto mb-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-500 text-sm">Reach out via email and our supply chain team will respond within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-4">
              Contact Supply Chain Team
            </h2>
            <p className="text-gray-500 text-lg">
              Have questions about your supply chain? Get in touch with our team.
            </p>
          </div>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition w-full sm:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Join and start managing your suppliers, shipments, and deliveries with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
               className="bg-gray-900 text-white font-bold px-10 py-3.5 rounded-lg text-lg hover:bg-gray-800 transition shadow-lg"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
               className="bg-orange-700 hover:bg-orange-800 text-white font-semibold px-10 py-3.5 rounded-lg text-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-orange-500">SCMS</span>
              <span className="text-gray-500 text-sm">Supply Chain Management System</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a href="#home" className="hover:text-orange-400 transition">Home</a>
              <a href="#services" className="hover:text-orange-400 transition">Services</a>
              <a href="#about" className="hover:text-orange-400 transition">About</a>
              <a href="#support" className="hover:text-orange-400 transition">Support</a>
              <a href="#contact" className="hover:text-orange-400 transition">Contact</a>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} SCMS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
