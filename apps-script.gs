function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ответы') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Ответы');
  if (sheet.getLastRow() === 0) sheet.appendRow(['Дата', 'Имя', 'Присутствие', 'Сопровождающий', 'Комментарий']);
  const data = JSON.parse(e.postData.contents || '{}');
  sheet.appendRow([new Date(), data.name || '', data.attendance || '', data.companion || '', data.comment || '']);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
