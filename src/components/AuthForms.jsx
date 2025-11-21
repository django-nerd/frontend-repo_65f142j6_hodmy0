import { useEffect, useState } from 'react'

function Input({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-700">{label}</span>
      <input
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6">
      <div className="text-lg font-semibold text-slate-900 mb-4">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

export default function AuthForms({ role = 'customer' }) {
  const [baseUrl, setBaseUrl] = useState('')
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('dropline.backendUrl')
    setBaseUrl(saved || import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000')
  }, [])

  const [form, setForm] = useState({
    // common
    email: '',
    password: '',
    // merchant
    shop_name: '',
    category: '',
    city: '',
    address: '',
    phone: '',
    // customer
    full_name: '',
    // driver
    vehicle_type: '',
    vehicle_plate: '',
    national_id: '',
  })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      let url = ''
      let payload = {}
      if (mode === 'login') {
        url = `${baseUrl}/auth/login`
        payload = { role, email: form.email, password: form.password }
      } else {
        if (role === 'merchant') {
          url = `${baseUrl}/auth/register/merchant`
          payload = {
            shop_name: form.shop_name,
            category: form.category,
            city: form.city,
            address: form.address,
            email: form.email,
            phone: form.phone,
            password: form.password,
          }
        } else if (role === 'customer') {
          url = `${baseUrl}/auth/register/customer`
          payload = {
            full_name: form.full_name,
            city: form.city,
            address: form.address,
            email: form.email,
            phone: form.phone,
            password: form.password,
          }
        } else if (role === 'driver') {
          url = `${baseUrl}/auth/register/driver`
          payload = {
            full_name: form.full_name,
            city: form.city,
            vehicle_type: form.vehicle_type,
            vehicle_plate: form.vehicle_plate || null,
            email: form.email,
            phone: form.phone,
            national_id: form.national_id || null,
            password: form.password,
          }
        }
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'خطأ غير متوقع')
      setMessage('تم بنجاح ✅')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7F0] via-[#F4F7FB] to-[#EBF3FF] py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}</h3>
            <p className="text-slate-600 text-sm mt-1">الدور المختار: {role}</p>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg border text-sm bg-white/70 border-slate-200 text-slate-800">{message}</div>
        )}

        <form onSubmit={submit} className="space-y-6">
          {mode === 'register' && role === 'merchant' && (
            <Section title="معلومات المتجر">
              <Input label="اسم المتجر" value={form.shop_name} onChange={(v)=>setForm({...form, shop_name:v})} />
              <Input label="التصنيف" value={form.category} onChange={(v)=>setForm({...form, category:v})} />
              <Input label="المدينة" value={form.city} onChange={(v)=>setForm({...form, city:v})} />
              <Input label="العنوان" value={form.address} onChange={(v)=>setForm({...form, address:v})} />
              <Input label="البريد الإلكتروني" value={form.email} onChange={(v)=>setForm({...form, email:v})} />
              <Input label="الهاتف" value={form.phone} onChange={(v)=>setForm({...form, phone:v})} />
              <Input label="كلمة المرور" type="password" value={form.password} onChange={(v)=>setForm({...form, password:v})} />
            </Section>
          )}

          {mode === 'register' && role === 'customer' && (
            <Section title="بيانات العميل">
              <Input label="الاسم الكامل" value={form.full_name} onChange={(v)=>setForm({...form, full_name:v})} />
              <Input label="المدينة" value={form.city} onChange={(v)=>setForm({...form, city:v})} />
              <Input label="العنوان" value={form.address} onChange={(v)=>setForm({...form, address:v})} />
              <Input label="البريد الإلكتروني" value={form.email} onChange={(v)=>setForm({...form, email:v})} />
              <Input label="الهاتف" value={form.phone} onChange={(v)=>setForm({...form, phone:v})} />
              <Input label="كلمة المرور" type="password" value={form.password} onChange={(v)=>setForm({...form, password:v})} />
            </Section>
          )}

          {mode === 'register' && role === 'driver' && (
            <Section title="بيانات السائق">
              <Input label="الاسم الكامل" value={form.full_name} onChange={(v)=>setForm({...form, full_name:v})} />
              <Input label="المدينة" value={form.city} onChange={(v)=>setForm({...form, city:v})} />
              <Input label="نوع المركبة" value={form.vehicle_type} onChange={(v)=>setForm({...form, vehicle_type:v})} />
              <Input label="رقم اللوحة" value={form.vehicle_plate} onChange={(v)=>setForm({...form, vehicle_plate:v})} />
              <Input label="الهوية/الرخصة" value={form.national_id} onChange={(v)=>setForm({...form, national_id:v})} />
              <Input label="البريد الإلكتروني" value={form.email} onChange={(v)=>setForm({...form, email:v})} />
              <Input label="الهاتف" value={form.phone} onChange={(v)=>setForm({...form, phone:v})} />
              <Input label="كلمة المرور" type="password" value={form.password} onChange={(v)=>setForm({...form, password:v})} />
            </Section>
          )}

          {mode === 'login' && (
            <Section title="تسجيل الدخول">
              <Input label="البريد الإلكتروني" value={form.email} onChange={(v)=>setForm({...form, email:v})} />
              <Input label="كلمة المرور" type="password" value={form.password} onChange={(v)=>setForm({...form, password:v})} />
            </Section>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-slate-600">
              إذا واجهت مشكلة اتصال، تأكد من عنوان الخادم الخلفي في صفحة الاختبار (/test) أو خزّنه محلياً.
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>setMode('login')} className={`px-4 py-2 rounded-xl border ${mode==='login' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-slate-200'}`}>دخول</button>
              <button type="button" onClick={()=>setMode('register')} className={`px-4 py-2 rounded-xl border ${mode==='register' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-slate-200'}`}>إنشاء</button>
              <button disabled={loading} className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50">
                {loading ? 'جاري المعالجة...' : (mode==='login' ? 'دخول' : 'إنشاء حساب')}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-10 bg-white/60 border border-slate-200 rounded-2xl p-5">
          <div className="font-semibold mb-2">المتطلبات الضرورية لكل دور</div>
          <ul className="list-disc ps-6 text-sm text-slate-700 space-y-1">
            <li>تاجر: اسم المتجر، التصنيف، المدينة، العنوان، البريد، الهاتف، كلمة المرور</li>
            <li>عميل: الاسم الكامل، المدينة، العنوان، البريد، الهاتف، كلمة المرور</li>
            <li>سائق: الاسم الكامل، المدينة، نوع المركبة، البريد، الهاتف، كلمة المرور، ويفضل رقم اللوحة ورقم الهوية</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
