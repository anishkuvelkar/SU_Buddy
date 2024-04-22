import FrameComponent from "../components/FrameComponent";

const me = () => {
  return (
    <div className="w-full h-[651px] relative flex flex-col items-start justify-end pt-[199px] px-0 pb-[29px] box-border leading-[normal] tracking-[normal]">
      <img
        className="w-[672px] relative max-h-full object-cover max-w-full"
        alt=""
        src="/image-2@2x.png"
      />
      <section className="w-full !m-[0] absolute h-full top-0 right-0 bottom-0 left-0 flex flex-col items-start justify-start pt-[7px] pb-0 pr-1 pl-0 box-border max-w-full z-1 text-center text-5xl text-black font-inter">
        <FrameComponent />
        <div className="self-stretch flex flex-row items-start justify-start relative max-w-full">
          <img
            className="h-[213px] w-[284px] absolute !m-0 top-[-199px] right-[-4px] object-cover z-2"
            loading="lazy"
            alt=""
            src="/frame-4@2x.png"
          />
          <div className="flex-1 flex flex-col items-end justify-start pt-0 px-0 pb-[29px] box-border relative min-h-[452px] max-w-full z-3">
            <div className="w-[284px] h-[423px] bg-gray-100 flex flex-row items-start justify-start py-[73px] pr-[45px] pl-[53px] box-border mq450:pl-5 mq450:pr-5">
              <div className="h-[423px] w-[284px] relative bg-gray-100 hidden" />
              <div className="flex-1 relative z-1 mq450:text-lg">
                <p className="m-0">Computer Science Badminton etc</p>
                <p className="m-0">Interests</p>
              </div>
            </div>
            <div className="w-full !m-0 absolute top-0 left-0 flex flex-row items-start justify-start max-w-full h-full">
              <div className="h-[427px] w-[672px] absolute !m-0 top-0 left-0 backdrop-filter:blur(4px) bg-white" />
              <img
                className="h-[452px] flex-1 relative rounded-[10px] max-w-full overflow-hidden object-cover z-1"
                alt=""
                src="/snapchat354014557-1@2x.png"
              />
            </div>
            <div className="self-stretch flex flex-row items-start justify-start py-0 px-[31px] box-border max-w-full mt-[-368px] text-[36px] text-gray-200 font-island-moments">
              <h3 className="m-0 w-[628px] relative text-inherit font-normal font-inherit inline-block shrink-0 backdrop-filter:blur(4px) max-w-full z-2 mq450:text-[22px] mq750:text-10xl">
                As a digital designer with a flair for the innovative, I meld
                technology and creativity in projects ranging from web
                development to interactive media. Passionate about nature, I
                often capture its beauty through my lens when I am not at my
                desk. I thrive on challenges, striving for excellence in every
                endeavor, and aim to leave a distinctive mark on the world
                through my creative pursuits.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default me;
