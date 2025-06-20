const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-semibold mb-4">Кыргыз Тилинин Корпусу</h5>
            <p className="text-gray-400">
              Кыргыз тилинин улуттук корпусу - тилди изилдөө жана үйрөнүү үчүн
              негизги ресурс.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Байланыш</h5>
            <p className="text-gray-400">corpus@kyrgyz-lang.kg</p>
            <p className="text-gray-400">+996 XXX XXX XXX</p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Шериктештер</h5>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Кыргыз Тилинин Корпусу. Бардык укуктар корголгон.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
