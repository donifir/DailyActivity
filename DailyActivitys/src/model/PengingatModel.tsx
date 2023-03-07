export interface PengingatModel{
  id:string;
  nama_pengingat:string;
  keterangan_pengingat:string;
  mulai_pengingat?:Date;
  selesai_pengingat?:Date;
}