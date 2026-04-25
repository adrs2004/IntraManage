import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";

function Performance() {
    const [performance, setPerformance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const perfRes = await API.get("/performance/my-performance");
                if (perfRes.data && perfRes.data.msg !== "No performance report yet.") {
                    setPerformance(perfRes.data);
                }
            } catch (err) {
                console.error("Failed to fetch performance data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformance();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div><p>Loading performance report...</p></div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white p-8 shadow rounded border-t-4 border-yellow-500">
                    <h2 className="text-2xl font-bold border-b pb-4 mb-6">My Performance Report</h2>
                    {performance ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-gray-50 p-6 rounded border text-center shadow-sm">
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Score</p>
                                <p className="text-4xl font-bold text-blue-600 mt-2">{performance.score}<span className="text-2xl text-gray-400">/10</span></p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded border text-center shadow-sm">
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Quality</p>
                                <p className="text-3xl font-bold text-green-600 mt-3">{performance.workQuality || "N/A"}</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded border text-center shadow-sm">
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Completed</p>
                                <p className="text-4xl font-bold mt-2 text-gray-800">{performance.tasksCompleted}</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded border text-center shadow-sm">
                                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Delayed</p>
                                <p className="text-4xl font-bold text-red-500 mt-2">{performance.delayCount}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No report available</h3>
                            <p className="mt-1 text-sm text-gray-500">Your manager has not rated your performance yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Performance;