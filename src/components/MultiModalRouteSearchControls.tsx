import { useEffect, useState } from "react";

export function MultimodalRouteSearchControls({
  searchMultiModalRoute,
}: Readonly<{
  searchMultiModalRoute: (
    origin: string,
    destination: string,
    date: string
  ) => void;
}>) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString());

  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  useEffect(() => {
    setIsSearchEnabled(!!origin && !!destination && !!date);
  }, [origin, destination, date]);

  const handleSearch = () => {
    searchMultiModalRoute(origin, destination, date);
  };

  return (
    <form className="w-75">
      <label htmlFor="origin-input" className="form-label">
        From:
      </label>
      <input
        className="form-control mb-2"
        type="text"
        id="origin-input"
        placeholder="Eg. Budapest, Hosok Tere"
        required={true}
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <label htmlFor="destination-input" className="form-label">
        To:
      </label>
      <input
        className="form-control mb-2"
        type="text"
        id="destination-input"
        placeholder="Eg. New York"
        value={destination}
        required={true}
        onChange={(e) => setDestination(e.target.value)}
      />
      <label htmlFor="travel-date" className="form-label">
        When?
      </label>
      <input
        className="form-control mb-2"
        type="date"
        id="travel-date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="button" disabled={!isSearchEnabled} className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
}
