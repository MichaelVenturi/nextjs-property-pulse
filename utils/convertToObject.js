export function convertToSerializableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    // if these methods exist on the document
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }
  return leanDocument;
}
