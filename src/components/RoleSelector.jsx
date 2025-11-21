import { useState } from 'react'
import { User, Store, Truck } from 'lucide-react'

function Card({ active, icon: Icon, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl p-5 border transition-all bg-white/70 backdrop-blur-md shadow-sm hover:shadow-lg ${
        active ? 'border-blue-500 shadow-blue-200' : 'border-blue-100'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl border ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="font-semibold text-slate-800 text-lg">{title}</div>
          <div className="text-slate-600 text-sm mt-1">{desc}</div>
        </div>
      </div>
    </button>
  )
}

export default function RoleSelector({ onSelect }) {
  const [role, setRole] = useState(null)

  const choose = (r) => {
    setRole(r)
    onSelect && onSelect(r)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7F0] via-[#F4F7FB] to-[#EBF3FF] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900">ابدأ بتحديد نوع حسابك</h2>
        <p className="text-slate-600 mt-2">اختر أحد الخيارات التالية للمتابعة:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card
            active={role === 'merchant'}
            icon={Store}
            title="تاجر"
            desc="متجر محلي يرغب ببيع منتجاته وتوصيلها داخل المدينة"
            onClick={() => choose('merchant')}
          />
          <Card
            active={role === 'customer'}
            icon={User}
            title="عميل"
            desc="مشتري يبحث عن طلب المنتجات واستلامها بسرعة"
            onClick={() => choose('customer')}
          />
          <Card
            active={role === 'driver'}
            icon={Truck}
            title="سائق"
            desc="عامل توصيل يستلم الطلبات ويوصلها للعملاء"
            onClick={() => choose('driver')}
          />
        </div>
      </div>
    </div>
  )
}
