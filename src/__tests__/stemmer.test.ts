import Stemmer from "../stemmer";

const customDictionary = [
  "hancur", "benar", "apa", "siapa", "jubah", "baju", "beli", "celana",
  "hantu", "jual", "buku", "milik", "kulit", "sakit", "kasih", "buang",
  "suap", "nilai", "beri", "rambut", "adu", "suara", "daerah", "ajar",
  "kerja", "ternak", "asing", "raup", "gerak", "puruk", "terbang", "lipat",
  "ringkas", "warna", "yakin", "bangun", "fitnah", "vonis", "baru", "ajar",
  "tangkap", "kupas", "minum", "pukul", "cinta", "dua", "jauh", "ziarah",
  "nuklir", "gila", "hajar", "qasar", "udara", "populer", "warna", "yoga",
  "adil", "rumah", "muka", "labuh", "tarung", "tebar", "indah", "daya",
  "untung", "sepuluh", "ekonomi", "makmur", "telah", "serta", "percaya",
  "pengaruh", "kritik", "seko", "sekolah", "tahan", "capa", "capai", "mula",
  "mulai", "petan", "tani", "aba", "abai", "balas", "balik", "peran", "medan",
  "syukur", "syarat", "bom", "promosi", "proteksi", "prediksi", "kaji",
  "sembunyi", "langgan", "laku", "baik", "terang", "iman", "bisik", "taat",
  "puas", "makan", "nyala", "nyanyi", "nyata", "nyawa", "rata", "lembut",
  "ligas", "budaya", "karya", "ideal", "final", "taat", "tiru", "sepak",
  "kuasa", "malaikat", "nikmat", "lewat", "nganga", "allah",
];

describe("Stemmer", () => {
  const stemmer = new Stemmer(customDictionary);

  describe("particle removal", () => {
    it("removes -lah particle", () => {
      expect(stemmer.stem("hancurlah")).toEqual("hancur");
      expect(stemmer.stem("kasihilah")).toEqual("kasih");
      expect(stemmer.stem("allah-lah")).toEqual("allah");
    });

    it("removes -kah particle", () => {
      expect(stemmer.stem("benarkah")).toEqual("benar");
    });

    it("removes -tah particle", () => {
      expect(stemmer.stem("apatah")).toEqual("apa");
    });

    it("removes -pun particle", () => {
      expect(stemmer.stem("siapapun")).toEqual("siapa");
    });
  });

  describe("possessive removal", () => {
    it("removes -ku possessive", () => {
      expect(stemmer.stem("jubahku")).toEqual("jubah");
      expect(stemmer.stem("kulitkupun")).toEqual("kulit");
      expect(stemmer.stem("berikanku")).toEqual("beri");
      expect(stemmer.stem("nikmat-Ku")).toEqual("nikmat");
    });

    it("removes -mu possessive", () => {
      expect(stemmer.stem("bajumu")).toEqual("baju");
      expect(stemmer.stem("sakitimu")).toEqual("sakit");
      expect(stemmer.stem("keberuntunganmu")).toEqual("untung");
    });

    it("removes -nya possessive", () => {
      expect(stemmer.stem("celananya")).toEqual("celana");
      expect(stemmer.stem("beriannya")).toEqual("beri");
      expect(stemmer.stem("miliknyalah")).toEqual("milik");
      expect(stemmer.stem("pelakunyalah")).toEqual("laku");
      expect(stemmer.stem("kebaikannya")).toEqual("baik");
      expect(stemmer.stem("medannya")).toEqual("medan");
      expect(stemmer.stem("menyatakannya")).toEqual("nyata");
    });
  });

  describe("suffix removal", () => {
    it("removes -i suffix", () => {
      expect(stemmer.stem("hantui")).toEqual("hantu");
      expect(stemmer.stem("mencintai")).toEqual("cinta");
      expect(stemmer.stem("menduakan")).toEqual("dua");
      expect(stemmer.stem("menjauhi")).toEqual("jauh");
      expect(stemmer.stem("menggilai")).toEqual("gila");
    });

    it("removes -kan suffix", () => {
      expect(stemmer.stem("belikan")).toEqual("beli");
      expect(stemmer.stem("bukumukah")).toEqual("buku");
      expect(stemmer.stem("bisikan")).toEqual("bisik");
      expect(stemmer.stem("terasingkan")).toEqual("asing");
      expect(stemmer.stem("membangunkan")).toEqual("bangun");
      expect(stemmer.stem("pelangganmukah")).toEqual("langgan");
      expect(stemmer.stem("menyanyikan")).toEqual("nyanyi");
      expect(stemmer.stem("mempromosikan")).toEqual("promosi");
      expect(stemmer.stem("mensyaratkan")).toEqual("syarat");
    });

    it("removes -an suffix", () => {
      expect(stemmer.stem("jualan")).toEqual("jual");
      expect(stemmer.stem("kesakitan")).toEqual("sakit");
      expect(stemmer.stem("perbaikan")).toEqual("baik");
      expect(stemmer.stem("bermakanan")).toEqual("makan");
      expect(stemmer.stem("pembangunan")).toEqual("bangun");
      expect(stemmer.stem("peranan")).toEqual("peran");
      expect(stemmer.stem("penyawaan")).toEqual("nyawa");
      expect(stemmer.stem("bertebaran")).toEqual("tebar");
    });
  });

  describe("me- prefix", () => {
    it("me{l|r|w|y}V", () => {
      expect(stemmer.stem("melipat")).toEqual("lipat");
    });

    it("mem{b|f|v}", () => {
      expect(stemmer.stem("membangun")).toEqual("bangun");
      expect(stemmer.stem("memfitnah")).toEqual("fitnah");
      expect(stemmer.stem("memvonis")).toEqual("vonis");
    });

    it("mempe", () => {
      expect(stemmer.stem("memperbaru")).toEqual("baru");
      expect(stemmer.stem("mempelajar")).toEqual("ajar");
      expect(stemmer.stem("mempopulerkan")).toEqual("populer");
      expect(stemmer.stem("mempengaruhi")).toEqual("pengaruh");
      expect(stemmer.stem("mempromosikan")).toEqual("promosi");
      expect(stemmer.stem("memproteksi")).toEqual("proteksi");
      expect(stemmer.stem("memprediksi")).toEqual("prediksi");
    });

    it("mem{rV|V}", () => {
      expect(stemmer.stem("meminum")).toEqual("minum");
      expect(stemmer.stem("memukul")).toEqual("pukul");
      expect(stemmer.stem("memuaskan")).toEqual("puas");
    });

    it("men{c|d|j|s|t|z}", () => {
      expect(stemmer.stem("mencinta")).toEqual("cinta");
      expect(stemmer.stem("mendua")).toEqual("dua");
      expect(stemmer.stem("menjauh")).toEqual("jauh");
      expect(stemmer.stem("menziarah")).toEqual("ziarah");
      expect(stemmer.stem("menuklir")).toEqual("nuklir");
      expect(stemmer.stem("menangkap")).toEqual("tangkap");
    });

    it("menV", () => {
      expect(stemmer.stem("menahan")).toEqual("tahan");
    });

    it("meng{g|h|q|k}", () => {
      expect(stemmer.stem("menggila")).toEqual("gila");
      expect(stemmer.stem("menghajar")).toEqual("hajar");
      expect(stemmer.stem("mengqasar")).toEqual("qasar");
      expect(stemmer.stem("mengupas")).toEqual("kupas");
      expect(stemmer.stem("mengkritik")).toEqual("kritik");
      expect(stemmer.stem("mengudara")).toEqual("udara");
    });

    it("mengV", () => {
      expect(stemmer.stem("menganga")).toEqual("nganga");
    });

    it("menyV", () => {
      expect(stemmer.stem("menyala")).toEqual("nyala");
      expect(stemmer.stem("menyanyikan")).toEqual("nyanyi");
      expect(stemmer.stem("menyatakannya")).toEqual("nyata");
      expect(stemmer.stem("menyuarakan")).toEqual("suara");
      expect(stemmer.stem("mensyukuri")).toEqual("syukur");
    });

    it("mempV", () => {
      expect(stemmer.stem("mewarnai")).toEqual("warna");
      expect(stemmer.stem("meyakinkan")).toEqual("yakin");
    });
  });

  describe("pe- prefix", () => {
    it("pe{w|y}V", () => {
      expect(stemmer.stem("pewarna")).toEqual("warna");
      expect(stemmer.stem("peyoga")).toEqual("yoga");
    });

    it("perV", () => {
      expect(stemmer.stem("peradilan")).toEqual("adil");
      expect(stemmer.stem("perumahan")).toEqual("rumah");
      expect(stemmer.stem("permuka")).toEqual("muka");
      expect(stemmer.stem("perdaerah")).toEqual("daerah");
    });

    it("pem{b|f|v}", () => {
      expect(stemmer.stem("pembangun")).toEqual("bangun");
      expect(stemmer.stem("pemfitnah")).toEqual("fitnah");
      expect(stemmer.stem("pemvonis")).toEqual("vonis");
      expect(stemmer.stem("peminum")).toEqual("minum");
      expect(stemmer.stem("pemukul")).toEqual("pukul");
    });

    it("pen{c|d|j|s|t|z}", () => {
      expect(stemmer.stem("pencinta")).toEqual("cinta");
      expect(stemmer.stem("pendua")).toEqual("dua");
      expect(stemmer.stem("penjauh")).toEqual("jauh");
      expect(stemmer.stem("penziarah")).toEqual("ziarah");
      expect(stemmer.stem("penuklir")).toEqual("nuklir");
      expect(stemmer.stem("penangkap")).toEqual("tangkap");
    });

    it("penV", () => {
      expect(stemmer.stem("penyuara")).toEqual("suara");
    });

    it("pengC", () => {
      expect(stemmer.stem("penggila")).toEqual("gila");
      expect(stemmer.stem("penghajar")).toEqual("hajar");
      expect(stemmer.stem("pengqasar")).toEqual("qasar");
      expect(stemmer.stem("pengudara")).toEqual("udara");
      expect(stemmer.stem("pengupas")).toEqual("kupas");
      expect(stemmer.stem("pengkajian")).toEqual("kaji");
      expect(stemmer.stem("pengebom")).toEqual("bom");
    });

    it("pelV", () => {
      expect(stemmer.stem("pelajar")).toEqual("ajar");
      expect(stemmer.stem("pelabuh")).toEqual("labuh");
    });

    it("peCerV", () => {
      expect(stemmer.stem("pekerja")).toEqual("kerja");
    });

    it("peC1erC2", () => {
      expect(stemmer.stem("peserta")).toEqual("serta");
    });

    it("peCP", () => {
      expect(stemmer.stem("petarung")).toEqual("tarung");
    });

    it("pelanggan and pelaku", () => {
      expect(stemmer.stem("pelanggan")).toEqual("langgan");
      expect(stemmer.stem("pelaku")).toEqual("laku");
    });
  });

  describe("be- prefix", () => {
    it("berV", () => {
      expect(stemmer.stem("beradu")).toEqual("adu");
      expect(stemmer.stem("berambut")).toEqual("rambut");
      expect(stemmer.stem("bersuara")).toEqual("suara");
      expect(stemmer.stem("berdaerah")).toEqual("daerah");
    });

    it("belajar", () => {
      expect(stemmer.stem("belajar")).toEqual("ajar");
    });

    it("berCAP", () => {
      expect(stemmer.stem("bekerja")).toEqual("kerja");
      expect(stemmer.stem("beternak")).toEqual("ternak");
    });

    it("berC1erC2", () => {
      expect(stemmer.stem("bersekolah")).toEqual("sekolah");
      expect(stemmer.stem("bertahan")).toEqual("tahan");
    });
  });

  describe("te- prefix", () => {
    it("terV", () => {
      expect(stemmer.stem("terasing")).toEqual("asing");
      expect(stemmer.stem("teraup")).toEqual("raup");
      expect(stemmer.stem("tergerak")).toEqual("gerak");
      expect(stemmer.stem("terpuruk")).toEqual("puruk");
    });

    it("terCP", () => {
      expect(stemmer.stem("terpercaya")).toEqual("percaya");
    });
  });

  describe("infix removal", () => {
    it("rerata (CerV)", () => {
      expect(stemmer.stem("rerata")).toEqual("rata");
    });

    it("lelembut (CerV)", () => {
      expect(stemmer.stem("lelembut")).toEqual("lembut");
    });

    it("lemigas (CerV)", () => {
      expect(stemmer.stem("lemigas")).toEqual("ligas");
    });

    it("kinerja (CinV)", () => {
      expect(stemmer.stem("kinerja")).toEqual("kerja");
    });
  });

  describe("combined affixes", () => {
    it("prefix + suffix combinations", () => {
      expect(stemmer.stem("meringkas")).toEqual("ringkas");
      expect(stemmer.stem("bersembunyi")).toEqual("sembunyi");
      expect(stemmer.stem("bersembunyilah")).toEqual("sembunyi");
      expect(stemmer.stem("membangunkan")).toEqual("bangun");
      expect(stemmer.stem("terasingkan")).toEqual("asing");
      expect(stemmer.stem("bertebaran")).toEqual("tebar");
    });

    it("kau- prefix", () => {
      expect(stemmer.stem("kupukul")).toEqual("pukul");
      expect(stemmer.stem("kauhajar")).toEqual("hajar");
    });

    it("ku- prefix", () => {
      expect(stemmer.stem("kuasa-Mu")).toEqual("kuasa");
    });

    it("complex combinations", () => {
      expect(stemmer.stem("mencapai")).toEqual("capai");
      expect(stemmer.stem("dimulai")).toEqual("mulai");
      expect(stemmer.stem("memberdayakan")).toEqual("daya");
      expect(stemmer.stem("persemakmuran")).toEqual("makmur");
      expect(stemmer.stem("kesepersepuluhnya")).toEqual("sepuluh");
    });
  });

  describe("custom dictionary", () => {
    it("stems with custom dictionary", () => {
      const custom = new Stemmer(["lari", "tulis"]);
      custom.addToDict(["cepat"]);
      expect(custom.stem("berlari")).toEqual("lari");
      expect(custom.stem("menulis")).toEqual("tulis");
      expect(custom.stem("bercepatan")).toEqual("cepat");
    });

    it("removes from dictionary", () => {
      const custom = new Stemmer(["lari", "tulis"]);
      custom.remove(["lari"]);
      expect(custom.stem("berlari")).toEqual("berlari");
    });
  });

  describe("edge cases", () => {
    it("returns short words as-is", () => {
      expect(stemmer.stem("mei")).toEqual("mei");
      expect(stemmer.stem("bui")).toEqual("bui");
    });

    it("returns unknown words as-is", () => {
      expect(stemmer.stem("marwan")).toEqual("marwan");
      expect(stemmer.stem("subarkah")).toEqual("subarkah");
    });

    it("handles case insensitivity", () => {
      expect(stemmer.stem("Perekonomian")).toEqual("ekonomi");
    });

    it("returns empty string for non-string input", () => {
      expect(stemmer.stem(null as unknown as string)).toEqual("");
      expect(stemmer.stem(undefined as unknown as string)).toEqual("");
      expect(stemmer.stem(123 as unknown as string)).toEqual("");
    });

    it("returns empty string for empty string", () => {
      expect(stemmer.stem("")).toEqual("");
    });

    it("returns single character as-is", () => {
      expect(stemmer.stem("a")).toEqual("a");
    });

    it("returns two character word as-is", () => {
      expect(stemmer.stem("ab")).toEqual("ab");
    });

    it("handles words in dictionary directly", () => {
      expect(stemmer.stem("nilai")).toEqual("nilai");
      expect(stemmer.stem("hancur")).toEqual("hancur");
    });
  });

  describe("additional stems", () => {
    it("prefix-only removals", () => {
      expect(stemmer.stem("menerangi")).toEqual("terang");
      expect(stemmer.stem("berimanlah")).toEqual("iman");
      expect(stemmer.stem("berpelanggan")).toEqual("langgan");
      expect(stemmer.stem("terabai")).toEqual("abai");
      expect(stemmer.stem("mengebom")).toEqual("bom");
    });

    it("suffix + prefix combinations", () => {
      expect(stemmer.stem("petani")).toEqual("tani");
      expect(stemmer.stem("finalisasi")).toEqual("final");
      expect(stemmer.stem("idealis")).toEqual("ideal");
      expect(stemmer.stem("idealisme")).toEqual("ideal");
      expect(stemmer.stem("mentaati")).toEqual("taat");
      expect(stemmer.stem("melewati")).toEqual("lewat");
    });
  });
});
