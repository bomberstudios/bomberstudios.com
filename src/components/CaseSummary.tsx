interface CaseSummaryProps {
  title: string;
  link?: string;
  client: string;
  tools: string;
  tldr: string;
}

export const CaseSummary = ({ title, link = '', client, tools, tldr }: CaseSummaryProps) => {
  return (
    <section className="text case-summary">
      {link && <h2><a href={link} target="_blank" rel="noreferrer">{title}</a></h2>}
      {!link && <h1>{title}</h1>}
      <p className="lead">{tldr}</p>
      <ul>
        <li>
          <strong>Client</strong>
          <span>{client}</span>
        </li>
        <li>
          <strong>Tools</strong>
          <span>{tools}</span>
        </li>
      </ul>
    </section>
  )
}