export function DataTable({ children }: { children: React.ReactNode }) { return <div className="overflow-x-auto rounded-2xl border border-rose-100 bg-white"><table className="w-full min-w-[720px] text-left text-sm">{children}</table></div>; }
export function Th({ children }: { children: React.ReactNode }) { return <th className="bg-rose-50 px-4 py-3 font-semibold text-rose-900">{children}</th>; }
export function Td({ children }: { children: React.ReactNode }) { return <td className="border-t border-rose-50 px-4 py-3">{children}</td>; }
