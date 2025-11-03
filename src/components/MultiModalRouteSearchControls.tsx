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
    <form>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Where from?"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Where to?"
        value={destination}
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
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="button" disabled={!isSearchEnabled} className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
}
