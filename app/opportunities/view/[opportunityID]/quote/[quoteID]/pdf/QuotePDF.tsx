const QuotePDF = async ({ quoteID }: QuotePDFProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/pdf/quote/${quoteID}`
  );
  const html = await response.text();

  //   const html = data.replace(
  //     '<img src="../headerbw.png">',
  //     '<img src="http://usw2dvzuid01w:81/pdf/headerbw.png">'
  //   );

  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/quote_pdf/${quoteID}`
  //   );
  //   console.log("Response:", response);
  //   const html = await response.text();
  //   console.log("HTML:", html);
  //   const bodyStart = html.indexOf("<body>");
  //   const bodyEnd = html.indexOf("</body>");
  //   const body = html.substring(bodyStart, bodyEnd);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
  //   return <iframe src={html} />;
};

interface QuotePDFProps {
  quoteID: string;
  ref?: React.MutableRefObject<any>;
}

export default QuotePDF;
