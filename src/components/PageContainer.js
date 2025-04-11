export default function PageContainer({ children }) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        {children}
      </div>
    );
  }