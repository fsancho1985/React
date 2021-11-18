import '../css/header.css'

function Header() {
    return (
        <>
            <section className="container-titulo" id="container-titulo">
                <div className="sub-container">
                    <div className="dog-img"/>
                    <div className="container-text">
                        <h2>Adote e salve uma vida</h2>
                        <p>Um gesto de carinho que pode salvar vidas.</p>
                </div>
                </div>
            </section>
                <div className="container-text2">
                    <div className="text-1">
                        <h3>Por quê adotar?</h3>
                            <p>Adoção salva a vida de um animal</p>
                            <p>
                                Adotar um animal é uma grande responsabilidade, e não é só porque você precisará cuidar dele em casa. A adoção é 
                                capaz de salvar a vida de um bichinho que poderia estar nas ruas, abandonado, morrendo de fome e possivelmente sofrendo de maus tratos. 
                                A maioria das ONGs e clínicas veterinárias não podem sustentar um animal por muito tempo, não tendo condições de manter a quantidade de 
                                cães e gatos desabrigados que frequentemente recebem. Além de levar um novo companheiro para a casa, você está salvando a vida de um grande 
                                amigo e dando a ele a oportunidade de receber amor em um lar seguro.
                            </p>
                    </div>
                    <div className="text-2">
                        <h3>3 Motivos para adotar</h3>
                            <h6>1 - Não vai faltar amor
                                <p>
                                    Acredite: adotar um animalzinho muda completamente a vida de alguém. E o amor que eles nos dão é tão grande que fica até difícil retribuir à altura!
                                </p>
                            </h6>
                            <h6>2 - Diminui o estresse
                                <p>
                                    Você sabia que adotar um animalzinho ajuda a diminuir o estresse? Sim! Até nisso eles contribuem.
                                </p>
                            </h6>
                            <h6>3 - A melhor companhia
                                <p>
                                    Adotar um cachorro vai deixá-lo eternamente grato a você. Você vai ter a melhor companhia que poderia querer em todos os momentos!
                                </p>
                            </h6>   
                    </div>
                </div>
        </>
    )
}

export default Header