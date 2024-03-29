import { useSearchParams } from "react-router-dom";

export default function SearchBar() {

    const [params, setParams] = useSearchParams();
    const queryFilter = params.get("query") ?? "";

    const changeFilter = newFilter => {
        params.set("query", newFilter.trim());
        setParams(params);
    };
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        form.reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Search movie</h2>
                <label>
                    <input
                        type="text"
                        name="search"
                        autoFocus
                        placeholder="Enter a search movie"
                        value={queryFilter}
                        onChange={e => changeFilter(e.target.value)}
                    />
                </label>

            </form>
        </div>
    );
}