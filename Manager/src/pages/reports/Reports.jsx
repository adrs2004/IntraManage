import Layout from "../../components/layout/Layout";

function Reports() {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Project Reports</h1>

            <textarea
                className="w-full border p-3 mt-4"
                placeholder="Write report..."
            ></textarea>

            <button className="bg-blue-600 text-white px-4 py-2 mt-3 rounded">
                Submit Report
            </button>
        </Layout>
    );
}

export default Reports;