import Layout from "../../components/layout/Layout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
    { name: "Planning", progress: 80 },
    { name: "Execution", progress: 60 },
    { name: "Testing", progress: 40 },
    { name: "Deployment", progress: 20 },
];

function Analytics() {
    return (
        <Layout>
            <div className="p-4 max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Project Analytics</h1>
                    <p className="text-gray-500 mt-2 text-lg">Visualize project progress and phase completion metrics.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                Phase Completion Overview
                            </h2>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 14, fontWeight: 500}} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                        <Tooltip 
                                            cursor={{fill: '#f3f4f6'}}
                                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}}
                                        />
                                        <Bar dataKey="progress" fill="#0d9488" radius={[6, 6, 0, 0]} maxBarSize={60} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Right side stats */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 -mr-10 -mt-10"></div>
                            <h3 className="text-teal-100 text-sm font-bold uppercase tracking-wider mb-1">Average Progress</h3>
                            <p className="text-5xl font-extrabold">50<span className="text-2xl text-teal-200">%</span></p>
                            <p className="text-sm mt-4 text-teal-50">Across all 4 active project phases.</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Phase Breakdown</h3>
                            <div className="space-y-4">
                                {data.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm font-medium mb-1">
                                            <span className="text-gray-700">{item.name}</span>
                                            <span className="text-teal-600">{item.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Analytics;