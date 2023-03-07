export interface KegiatanModel{
  id:string;
  id_pengingat:string;
  nama_kegiatan:string;
  keterangan_kegiatan:string;
  mulai_kegiatan:Date;
  status:boolean;
  // children?: JSX.Element|JSX.Element[];
}