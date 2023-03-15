import { View, Text, ScrollView } from "react-native";
import SpecifiedView from "../components/SpecifiedView";

const Shipping = ({ route, navigation }) => {
  return (
    <SpecifiedView>
      <ScrollView>
        <View style={{ width: "100%", height: "100%", backgroundColor: "white", paddingHorizontal: 20 }}>
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Shipping & Returns</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Prosedur Pengembalian & Penukaran Pesanan Online</Text>
            <Text style={{ fontSize: 14, textAlign: "justify", marginTop: 5 }}>Pengembalian dan penukaran gratis ! Untuk mengembalikan atau menukar barang yang dibeli di Erigo, ikuti langkah-langkah mudah berikut:</Text>
            <View>
              <Text style={{ fontSize: 14, textAlign: "justify", marginTop: 5, fontWeight: "bold" }}>1. Konfirmasi Alasan Pengembalian</Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>Jika anda mengalami kendala pada product yang anda beli, silahkan melakukan konfirmasi dengan Tim Customer Service dari Erigo melalui chat pada Akun Resmi Panjualan Product Erigo yang tersedia pada marketplace yang anda gunakan pada saat melakukan pembelian product .</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, textAlign: "justify", marginTop: 5, fontWeight: "bold" }}>2. Tim Menghubungi Anda</Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>Setelah anda melakukan konfirmasi , tim akan segera menghubungi anda Via telepon / Whatsapp melalui nomor telepon yang tercantum pada rincian pesanan anda untuk memastikan Persyaratan Retur pada produk yang anda konfirmasi lengkap , seperti Tag product yang masih tergantung dan Product yang belum di gunakan / di cuci, lalu akan memberikan prosedur penukaran / retur .</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, textAlign: "justify", marginTop: 5, fontWeight: "bold" }}>3. Lampirkan Label Pengembalian</Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>Selanjutnya, siapkan paket Anda untuk dikirim kembali kepada kami. Pastikan Product , tag product yang masih tergantung dan form prosedur retur anda sisipkan pada paket .</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, textAlign: "justify", marginTop: 5, fontWeight: "bold" }}>4. Lampirkan Label Pengembalian</Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>Selanjutnya, siapkan paket Anda untuk dikirim kembali kepada kami. Tambahkan item Anda dan rekatkan paket Anda dengan aman. Pastikan untuk melepas atau menutupi label pengiriman asli dan melampirkan label pengembalian baru Anda ke paket. Anda sudah siap! Cukup jadwalkan pengambilan atau pengantaran di fasilitas resmi mana pun untuk jasa kurir yang ditunjuk pada label pengiriman Anda.</Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>Harap tunggu sekitar 7 - 14 hari untuk pemrosesan pengembalian. Anda akan menerima pemberitahuan dari kami saat pengembalian Anda telah kami terima dan siap untuk di proses. Tahap terakhir , anda hanya cukup menunggu untuk pemberitahuan nomor resi yang akan di infokan oleh tim kami.</Text>
            </View>
          </View>

          <View style={{ marginTop: 10, marginBottom: 25 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Prosedur Pengiriman</Text>
            <Text style={{ fontSize: 14, textAlign: "justify", marginTop: 5 }}>
              Kami mengemas dan mengirimkan pesanan Anda sesegera mungkin. Kami akan tetap proses sesuai pesanan yang anda buat. Pesanan yang di proses tetap menyesuaikan urutan pesanan yang masuk dan mungkin akan terjadi keterlambatan apabila trafic pesanan yang sangat tinggi. Meski demikian, kami akan melakukan semua yang kami bisa untuk memastikan pesanan Anda terkirim tepat waktu, dan Erigo tidak bertanggung jawab atas kondisi di luar kendali kami seperti cuaca buruk, gangguan layanan, dll.
              Anda dapat melakukan pengecekan secara berkala untuk status pengiriman pesanan anda melalui halaman rincian pesanan anda yang terdapat pada marketplace atau halaman website resmi Erigo yang anda gunakan pada saat melakukan pemesanan .
            </Text>
          </View>
        </View>
      </ScrollView>
    </SpecifiedView>
  );
};

export default Shipping;
