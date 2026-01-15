declare module "pdfjs-dist/build/pdf.mjs";
declare module "pdfjs-dist/build/pdf.worker.mjs?url";

declare module "*?url" {
  const src: string;
  export default src;
}
