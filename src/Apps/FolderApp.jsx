export default function FolderApp({
  folderName,
}) {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">
        📁 {folderName}
      </h1>

      <p className="mt-4 text-slate-400">
        This folder is empty.
      </p>
    </div>
  );
}