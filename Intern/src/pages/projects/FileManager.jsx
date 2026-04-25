import Layout from "../../components/layout/Layout";
import { useState } from "react";

function FileManager() {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        if (uploadedFiles.length === 0) return;
        
        const newFiles = uploadedFiles.map(file => ({
            name: file.name,
            version: files.length + 1,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            date: new Date().toLocaleDateString()
        }));
        
        setFiles([...files, ...newFiles]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const uploadedFiles = Array.from(e.dataTransfer.files);
        if (uploadedFiles.length === 0) return;
        
        const newFiles = uploadedFiles.map(file => ({
            name: file.name,
            version: files.length + 1,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            date: new Date().toLocaleDateString()
        }));
        
        setFiles([...files, ...newFiles]);
    };

    return (
        <Layout>
            <div className="p-4 max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Project Resources</h1>
                    <p className="text-gray-500 mt-2 text-lg">Upload your deliverables or download assets from the team.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Section */}
                    <div className="lg:col-span-1">
                        <div 
                            className={`bg-white p-8 rounded-2xl border-2 border-dashed transition-all duration-300 text-center ${isDragging ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 hover:border-cyan-400'}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Submit Deliverable</h3>
                            <p className="text-xs text-gray-500 mb-6">Drag and drop files here, or click to browse.</p>
                            
                            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors inline-block shadow-sm">
                                Browse Files
                                <input type="file" onChange={handleUpload} className="hidden" multiple />
                            </label>
                        </div>
                    </div>

                    {/* Files List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">Shared Documents</h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">{files.length} Files</span>
                            </div>

                            <div className="p-6">
                                {files.length === 0 ? (
                                    <div className="text-center py-10">
                                        <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                        <p className="text-gray-500 font-medium">No files uploaded yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {files.map((file, index) => (
                                            <div key={index} className="border border-gray-200 rounded-xl p-4 flex items-start hover:shadow-md hover:border-cyan-300 transition-all group bg-white">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-bold text-gray-900 truncate" title={file.name}>{file.name}</p>
                                                    <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                                                        <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">v{file.version}</span>
                                                        <span>{file.size}</span>
                                                        <span>{file.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default FileManager;