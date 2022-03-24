import { isBase64, getCookie } from '@src/common/utils/method';

export const getAppStoreImageUrl = async (url) => {

  const getImageUrl = (url)=>{
    return new Promise((resolve, reject) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url, true);
      xmlhttp.responseType = "blob";
      const token = getCookie('token');
      xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
      xmlhttp.send();
      xmlhttp.onload = function () {
        const  blob = this.response;
        const imageUrl = window.URL.createObjectURL(blob);
        resolve(imageUrl)
      }
      xmlhttp.onerror = function (err) {
        console.log(err)
      }
    })
  }

  let imageUrl = url;
  if (String(url).startsWith('att-')) {
    imageUrl = `/kapis/openpitrix.io/v1/attachments/${url}?filename=raw`;
    imageUrl = process.env.NODE_ENV === "production" ? await getImageUrl(imageUrl) : '/api' + imageUrl;
  }

  if (isBase64(url) && !url.includes('/attachments/')) {
    imageUrl = `data:image/png;data:image/svg;data:image/jpg;base64,${url}`;
  }
  return imageUrl;
}

export const getImageUrls = (images) => {
  if (typeof images === 'string') {
    return images
      .split(',')
      .filter(Boolean)
      .map(image => getAppStoreImageUrl(image.trim()))
  }
  if (Array.isArray(images)) {
    return images.map(image => getAppStoreImageUrl(image));
  }
  return [];
}

export const safeAtob = str => {
  let result = ''
  try {
    result = atob(str)
  } catch (e) { }
  return result
}
