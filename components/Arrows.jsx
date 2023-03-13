export const  SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      >
        <svg
          width={30}
          height={31}
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.08"
            x="0.5"
            y={1}
            width={39}
            height={39}
            rx="19.5"
            stroke="#22172A"
          />
          <g clipPath="url(#clip0_69_921)">
            <path
              d="M17 26.5L23 20.5L17 14.5"
              stroke="#333333"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_69_921">
              <rect
                width={24}
                height={24}
                fill="white"
                transform="matrix(-1 0 0 -1 32 32.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
  
  export const  SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent" }}
        onClick={onClick}
      >
        <svg
          width={30}
          height={31}
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.08"
            x="0.5"
            y={1}
            width={39}
            height={39}
            rx="19.5"
            stroke="#22172A"
          />
          <g clipPath="url(#clip0_69_919)">
            <path
              d="M23 14.5L17 20.5L23 26.5"
              stroke="#333333"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_69_919">
              <rect
                width={24}
                height={24}
                fill="white"
                transform="translate(8 8.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }