export const buildFormData = (files: FileList | null) => {
  const formData = new FormData();

  if (files) {
    if (files.length > 4) {
      throw new Error('Demasiadas imágenes, max 4');
    } else {
      for (let i = 0; i < files.length; i + 1) {
        const fsize = files[i].size;
        const file = Math.round(fsize / 1024);

        if (file >= 10240) {
          throw new Error(`Imágen muy grande para subir (${files[i].name})`);
        }
        formData.append('image[]', files[i]);
      }
    }

    return formData;
  }
  throw new Error('Ocurrió un error tratando de guardar las imágenes');
};
