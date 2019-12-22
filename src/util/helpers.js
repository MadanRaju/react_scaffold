import Moment from 'moment';

class Helpers {
  static formatDate(date, format) {
    let formattedDate = null;
    if(!isNaN(new Date(date).getTime())) {
      formattedDate = Moment(new Date(date))
        .local()
        .format(format);
    }
    return formattedDate;
  }

  static createFilter(key, op, value) {
    const filter = {};
    if(value) {
      filter[key] = {};
      filter[key][op] = op === '$in' ? value.toString().split(',') : value.toString();
    }
    return filter;
  }

  static downloadBlob(blob, fileName) {
    const name = fileName + this.formatDate(new Date(), '-MM-DD-YYYY-hh-mm') + '.xlsx';
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', name);
    if(typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
  static wordSplitter(str, l) {
    const strs = [];
    while (str.length > l) {
      let pos = str.substring(0, l).lastIndexOf(' ');
      pos = pos <= 0 ? l : pos;
      strs.push(str.substring(0, pos));
      let i = str.indexOf(' ', pos) + 1;
      if(i < pos || i > pos + l) { i = pos; }
      str = str.substring(i); // eslint-disable-line
    }
    strs.push(str);
    return strs;
  }

  static createRangeFilter(key, minValue, maxValue) {
    const filter = {};
    if(minValue || maxValue) {
      filter[key] = {};
      if(minValue) {
        filter[key].$gte = minValue;
      }
      if(maxValue) {
        filter[key].$lte = maxValue;
      }
    }
    return filter;
  }

  static round(value) {
    return Math.round(value * 100) / 100;
  }
}

export { Helpers as default };
