import { useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const Epub = () => {
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const cleanISBN = isbn.replace(/[^0-9]/g, "");
    setLoading(true);
    setError("");

    try {
      // Fetch metadata from Google Books API
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanISBN}`
      );
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        throw new Error("Book not found!");
      }

      const book = data.items[0].volumeInfo;
      const { title, authors, description } = book;

      // Fetch cover image from Open Library API
      const coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanISBN}-L.jpg`;
      let coverBlob = null;
      const coverResponse = await fetch(coverUrl);
      if (coverResponse.ok) {
        coverBlob = await coverResponse.blob();
      }

      // Create EPUB structure using JSZip
      const zip = new JSZip();

      // Add EPUB mimetype (must be the first file)
      zip.file("mimetype", "application/epub+zip");

      // Add META-INF directory and container.xml
      const metaInfFolder = zip.folder("META-INF");
      metaInfFolder!.file(
        "container.xml",
        `<?xml version="1.0"?>
        <container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
          <rootfiles>
            <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
          </rootfiles>
        </container>`
      );

      // Add OEBPS directory
      const oebpsFolder = zip.folder("OEBPS");

      // Add content.opf
      oebpsFolder!.file(
        "content.opf",
        `<?xml version="1.0" encoding="UTF-8"?>
        <package xmlns="http://www.idpf.org/2007/opf" version="3.0">
          <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
            <dc:title>${title || "Untitled"}</dc:title>
            <dc:creator>${authors ? authors.join(", ") : "Unknown Author"}</dc:creator>
            <dc:description>${description || "No description available."}</dc:description>
          </metadata>
          <manifest>
            <item id="cover" href="cover.jpg" media-type="image/jpeg"/>
            <item id="content" href="content.xhtml" media-type="application/xhtml+xml"/>
          </manifest>
          <spine>
            <itemref idref="content"/>
          </spine>
        </package>`
      );

      // Add content.xhtml
      oebpsFolder!.file(
        "content.xhtml",
        `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <title>${title || "Untitled"}</title>
          </head>
          <body>
            <h1>${title || "Untitled"}</h1>
            <p>${description || "No description available."}</p>
          </body>
        </html>`
      );

      // Add cover image
      if (coverBlob) {
        const coverArrayBuffer = await coverBlob.arrayBuffer();
        oebpsFolder!.file("cover.jpg", coverArrayBuffer);
      }

      // Generate EPUB file
      const epubBlob = await zip.generateAsync({ type: "blob" });
      saveAs(epubBlob, `${title || "book"}.epub`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate EPUB"}
        </button>
        {error && <p>{error}</p>}
      </div >
    </>
  );
};

export default Epub;