import { useEffect, useState } from "react";
import { FaEnvelope, FaTrash } from "react-icons/fa";
import api from "../../services/api";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contact-messages");
      setMessages(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMessages(); }, []);

  const removeMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await api.delete(`/contact-messages/${id}`);
      setMessages((current) => current.filter((message) => message._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete the message.");
    }
  };

  return <div>
    <div className="mb-6"><p className="text-sm font-bold uppercase tracking-wider text-micro-600">Contact form</p><h1 className="mt-1 font-display text-3xl font-semibold text-ink-900">Messages</h1><p className="mt-2 text-ink-500">Messages submitted through the public contact form.</p></div>
    {error && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</p>}
    {loading ? <p className="text-ink-500">Loading messages...</p> : messages.length === 0 ? <div className="ticket-stub bg-paper-100 p-10 text-center"><FaEnvelope className="mx-auto text-3xl text-micro-600" /><p className="mt-3 font-semibold text-ink-900">No messages yet</p></div> : <div className="space-y-4">{messages.map((message) => <article key={message._id} className="ticket-stub bg-paper-100 p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-semibold text-ink-900">{message.name}</h2><a href={`mailto:${message.email}`} className="text-sm text-micro-600 hover:underline">{message.email}</a></div><button onClick={() => removeMessage(message._id)} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50" aria-label={`Delete message from ${message.name}`}><FaTrash /></button></div><p className="mt-4 whitespace-pre-wrap leading-7 text-ink-700">{message.message}</p><p className="mt-4 border-t border-ink-100 pt-3 text-xs text-ink-500">{new Date(message.createdAt).toLocaleString()}</p></article>)}</div>}
  </div>;
}

export default AdminMessages;
