import Layout from "../../components/layout/Layout";

function ProjectDetails() {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Project Details</h1>

            <div className="mt-4 bg-white p-4 rounded shadow">
                <p><strong>Name:</strong> Project System</p>
                <p><strong>Description:</strong> Industry project management</p>
                <p><strong>Status:</strong> Execution</p>
            </div>
        </Layout>
    );
}

export default ProjectDetails;