const HistoryCard = ({ history }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article className="flex flex-row w-full">
      <div className="card bg-base-100 h-max-[500px] shadow-sm">
        <div className="card-body">
          <h2 className="card-title">
            {history.tracking_code}
          </h2>
          <p>{history.status}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-info">
              {formatDate(history.created_at)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HistoryCard;
