import { useState } from "react";

const documentOptions = [
  "registration_certificate",
  "grade_transcript",
  "parking_permit",
  "library_card",
  "internship_permit",
  "studentCard",
  "block_academic_year",
  "bon_conduit",
  "classement",
  "convention_de_stage",
  "copie_de_bac_rectorat",
  "releve_de_note_inh",
  "block_d_annee_rectorat",
  "attestation_de_langue",
  "accise_de_diplome"
];

const DocumentRequestComboBox = () => {
  const [query, setQuery] = useState("");
  const [filteredDocs, setFilteredDocs] = useState(documentOptions);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setFilteredDocs(
      documentOptions.filter((doc) =>
        doc.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="relative w-80 mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={"Search for a document"}
        className="w-full p-2 border rounded"
      />
      {query && (
        <ul className="absolute w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <li
                key={doc}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setQuery(doc);
                  setFilteredDocs([]);
                }}
              >
                {doc}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">{"No results found"}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DocumentRequestComboBox;
