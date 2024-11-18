import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const isLoggedIn = localStorage.getItem("token") !== null;
const Header = (props) => {
  let button;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  if (isLoggedIn) {
    button = (
      <>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/signup">
            Sign Up
          </Link>
        </li>
      </>
    );
  } else {
    button = (
      <>
        <li className="nav-item">
          <Link className="nav-link active" to="/chats">
            Chats
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle rounded-circle w-25"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded={dropdownOpen ? "true" : "false"}
            onClick={toggleDropdown}
          >
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhMVFRUXFxcaGBUYGBgXFxcXGBcWGhYYFx4YHSggGBolGxcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi8lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABIEAACAQIDBQYCBwUGBQMFAQABAgMAEQQSIQUxQVFhBhMicYGRMqEHQlKxwdHwFCMzYnI0gpKisuEWQ1Nz8RWDwhckVLPSCP/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAvEQACAgEDAgMGBgMAAAAAAAAAAQIRAxIhMQRBE1FxBTJhgZHBFFKhsdHwFSIz/9oADAMBAAIRAxEAPwDP9p+0rx3jisGI+LeQOYG4H3rEAlmuSSTqSTcnzNAZ5WZtSbFmPADmeXIU7ClhVpUS2+4sClRJc3pB1NqlomlBDBan4I+NIRLmpSiqJEtTkEHOlQxXNz/4FTFW1AhUaU4qX6Dify/OkDMTYAAcSdfSw0v608Qqi7H1J/QFMB6Mi2lL77L67hzqtk2iNyDN1Oij8TStngs9ybkfjy5caA4L/BLpc7z8h0pTNdyeQsPxpxTlW/IfPhUVN1IqyHi38ZqVgT4B5t/qNV7m5PnVhhR4F8r++tMkkKafD8tw/V/e59aYGnmfu4/l70zPJc5Bx39Byp0Ow0bM2bmdPIA2/P1qUguwHqfT/wAiigguy/rgattmbOJYm3l6UXQRTbHtnYS8ieTD7j+FbbBwWFV2AwAGRvM+6mroCsJu2dCVIAoUKFIQKFChQAS0dEONHSBgoUV6FFCs82bbCQKuEi1C2aV+LvbS/Qb7eXKqhmonkLEsxuSSSeZOpptjetUTyScInGpdIw6WAp5N/lTIbHYktT8aXPQU0DU2FLUyR1EtRNKOvpv/ANqJ5ANN5pFuPsKAET4thooC8ran8hUZIWc3Yk2/Vqe7vXmTU0RZRb9XoCyIUA0FWmwot7df9vzqulq+wCZEAPAXNMELxsuoX1P6/W+kA6XphCSSx4/r8qfI8BpAV5FXEUeVRfgAPlVcsd/x8uNXEeGaQ3sQOAqkCIxYm9t/Pl0FSNm4AnxW31cYTYhawtb8BxrT4DZAW2lS5pGscTfJSbP2V41BH1WPsUH/AMq1GEwIUbqeigAbyUAepN/9IqQ26snKzVJIbw6+FfIfdTpqFgsSGygfZHrpU00nsDCoULUdBIVCiB1I6D53/KlUAFxoUKFABWoUL0KLEeTg1LgW5qPFU3CCtSWqJwNhQjam5G0tRRm5AoMyxww4+1OyzW0G/wC6mmksLD/xS8HBmNzu++mIlYODid1Lc319vKnpDplHHf5fr8aZla34UxCsJHc35ffTstLwq+GoG3McIYy31joo5t+Q30AlZHTEZ8SkK6hbvIfL4V9yt/StHO+lvU/h+ulZLsXFpLM2pJCg8z8Te5I9q1IHPeTrT7Dls6FgWAH61pyZvCAupvryHmfw30gC5qVOLELyFIESNibPzyKLZjqeigcQPOwv1rebO2MBqRUfsXsvJF3rDxSWt0QfD76nytV5j8akKF38gBvY8AOtZSk+EbwSSsj46ZYVFgC7kLGvNiQBf+UE3JqwVbADf151m9hZsRO2Ik3Joo4BiNw6Kp9S960pNS1RV2JTeTVb2lxvdYd2G8jKvm2g9t/pUrB4oOZAuoRshP8AMACw9MwHnesP2m2v38rRobpG4jHJnAvIfQlV9DzqoRthJ0i72FMc/QKPwArTmsp2fS+v2pFA8l8bfcBWpVwdb7r/AC30T5GuARnQUqoGwcT3kCSfazH/ADtU41LENxnxN6D7z+NOU3BxPMn5afhTlAMOkltbc7/K350qmMSbZTyYf5rr95FAhy9Ck3oUUI8qTYkMEARVyrYkb3Nybt11t6UqBtPWixGDKc6TGauNVsdXXQnGa180SnbWncGdS3LdUQtpUmDQWqjgJsKljVzAlhVdgF0vzqxvpbnp+fyvTRDAW3sf0OH661Gvc68f0BS5XzHTcKj7Om7zEFV+GIXY83JsB6DN6jpTsEi7C2AHOsB2j2h3spsfAl1Xr9pvUj2ArSdotqd3HJlOvhjB5MwzOfRCvrVJsLYTOweTwqtjlPxHiLj6o89/zpGkdt2abYGEMcKKd4Fz/U2p9r/IVZXpCtbSlA0zPlknCb7nhrV32Y2ScTMSw/drq558l9fuv0qp2VgnncRRjVt54Ko3k9B+QroUmNw2z4lhveQgsIxbvJDoGc/ZW9hc6DQC+gqZPsaQXdlvj8bHAhdzZRoAN5PBVHE1hcXjpMTJmI1Jyog3Lc6AdSbXP4AAQdo7Ued88h6Ko+FByX8TvPoANJ2L2de+IYaC4j6ncz/eo/vdKmtO7LvUaPZmDEMSxjW2882OrH3qH2n2sMNA0m9vhRftOfhHW2/yFWxNc+7Y7ZSGcSykNIgP7Nh+RO+eYcNR4V3+HhY2lbsrgd2ntFsDgEhVv/uZD4jfVHlzM7t1AvbrY7qzexYbLGOhc/39V9cuSqrEM8zqshLMczSOd4L2aY+iBUHI6CtJ2fmVpWckWUZ2A1sL2RfVtLcchraO25nJ3sabFY0YPDNK1rxrZR9qaTW3WxsPJTUDsbtzNs9gzEyIZEJO8l7up9cx/wAJrDdqu1qYmXu0BeKMlUsVyu5+N73132B5C/1qjbK2sYo5CqqM/dnKWzXKyBRfkbStzqasu9zsnZD+yR9GlHtK9W8h0qh7LT5MNhkcWebvXC8QpLvf2K/4quMW2luZA/Os3yXFC8OPCKcoLQ41ImCmMb8DdBf1XUfdT9IdbgjnemERrNQqsu1CnsaaDgKusq6ixIuLDrb/AGqlZbaVK2ObMBzB+X6NXJ2G0qF1B8wNL1GpYnT4PdnhfX9NGa95bepRW3VJjph4yrFWFiN4p/DnWt0fNTg4vTJboucMNKdlfW3T76Zw9JibMSf5iPbT8KZiN7UxndRFvrHRfPn6DWomw37rDr9vEzhBzyAhWPzb1YVV9osVnlKj4Y/CPP6x99P7tP5z3+EjUH92sJt/M5Ezn/Nr/TQaqOwWIZ8RMEiP1nfNwXO2bNfhZcg9NK1eAwqxJkXXiWO9mO9j51G2XgFhQRrqx1ZuLW3noBuA6ipxNMicr4HENT9nYJpbnRVX45HOWOO/2mO8/wAo13edVWHnVr2GcDkSFJ5ZhqeuX3vpU3ESuwUMfCtgqgBUX+lRoPPeaLElXJL2/wBu0wEf7Ps9M0jjxYmRbbtLoh3jU2voOR1NZHsdPJNPPiJXaSQqAXYkkljc3J/oGnCqXa+fEYtkjVna+RVUXNl3+l8xvW17F4CCCNu+cTPmu0MLXW5GiSTDw6W1WPMddTralsjV+6a3s3sRsS19ViB8T7r23oh58CeHnXSoowqhVACqAABoABoAOlYjYm2WZjNORHh4VskSDKgc/AqgfG1gd+7fpS9hdo5MRj1DeGNo5FSMbgRlYFvtNlVteG4cbxJNji0iz7SdpRBnRACyKGckgBb/AAJr9ZjbfoAb1xeHFNJLJNKQ7Zs8j7wzncovw0AHReVquO20jTTSoDbPiZGc8khJii89zafyis5iBcLDGLKTa53sTozN0A992gpxVA3ZLwyyMjst3klGp4CO5sF6u2vkAeNT22XaBYXm7pCc0lrXma2UCxB/dKNFW2upOp00mx8IioANbe/rWJ2hjGdne2Zrmy3t5L0pSlR6fsvoY9VNqbpJW65+RKTsjCwJimzeiaX5gKrCkbJ7LKshfFTWwcBVpSAwJfekEYJJMrC2gOgN9LrTGCndWRlOV9Ou/eDzFbvaWFUplO5Qco+qt9WIvxJ1LHU8TThNyH7T6FdHNKLtNbeY92S7T/t2OSWwRbMqx31jQCRVUjnxP5WrexTd5JpuUX9W3fKuKdi5hBj5GTXwXt/NldQfdgfSuxbN/doif8yTxHoLak8tBbzokjzolwKSh40ln3gcPvNDNbKvO/sB+dvesyqHKiY3E5FdvsZWP9Nxf7mqTI4AuTb/AMXrO9oNoKJBh/rTwTAeardQfPxW8jQXhx6pV/duf0LvuRR1yX/jKf7H+c/lQqNSPU/xGfzX1X8nPZF7udIwLlVRLDizAE/5jXVewXaPDQRvDMSrFyTcXFrAWI33386wuAwWfFtiDuXEZB6Kwv75KqO0bFcXMAT8QPuqn8aMuFZdjk6brVDE8ORNxbvblGh7U4aGad3h0UscvkbcPew+dUBwTpYsuht4hqONgSNx0NMO8qRRSZz+97wgED4VYKvuQx9albN21Kgf4CGFiGW6neTpup44Tgq5R0dXn6LqI2rUvPz9R2TEZR1JCjzY2/39KRg8QO7jPOW3orFj8lPvUHFuHdWAKhTfLfMPc6+96Z2dMO6W5ACysbk2Hiha3zU10M8RRKk5nPEsx3DeSx/M1sskcHeTyEZm08gAAqLzOg/QvVXgUjwyCWVf3jD93Hfx2P1m4ID9199Vk0r4h8zsFUcfqoOQHE9BqaGU1ZrNkTlo2xEnhzHQcFRTYDqSbm/G46VX7W2qBfPcLwhGjv1lP1E/l3n10jba2qUIw8PhWMBc31rgWNvskbr7733VVbPiuwa2Y5gFB+tIdwPQbz/vQKMa3Zs9ghspaQgGwLDcqaXSMD6oVTcjm9+dVv8A68ZsXEqG0Qe39ZIIzHproKgba2r4f2eJroP4j8ZHvdv7t/fyFQ9hYR5JkyWGVgzMTZVANzc0Ao92SdlYCfEZrN3UMjnM27OblsoA1lI323DebV0DZ+DSFFjjFlHueZPMmqXY5wmGyxrJ38xFiU8YUX1AO5VvwGpNtCbCrv8AaPGIVGaY6lN/dL9qUjQf079QOtCJluSpJSwA+qu4cBfeepPP8BUXZu1xFioZfqRyLmPQnLIfJVZvU9KrdqbfgDmASgW0dxc68VUjjzPDcNdyIJ8ORZZoyN1swHyNJscY92XG18JfEThr/wAaUbyNO8a27ob+tVbbJJup1HAjQ+vWr3CwSSnMRmBC+Ma3yqF162A14m/OtbsLYIBdZ4+CkX5G+otUajVQs5zhocRD8D3HIix+Wh9qosbhZjIWCWzEkjdYnfYnS1d9xOxYJN6AHmuh/I+1VGK7HIdUe3mPxH5UavM6cM54ZaoOmcdwELI4aRGaxBCrYi/AkjlvtU3aeOxMgJ1UfrcBoD5lj5V1GHsaL+Jl+f3affVXt3Yyxm8R7woGLkCyxWtYX1CnedSW0B5UKSFnyzyvVN2zL9i9kGBu8kF3Y+IHgBrl/qJtmPAab7103YZY5pm8TsbKOZ5DkN3kAaw2zVAJeR8qiwvy42UcWPLpc8a0W0cW/dRwoDG01kijv48h3vJ9leNt7HU6aVbOaJrMNKpTMGDAFrsNxIJzW6A3HpUGTGD9sAJsEwruf78ifgnzqj7RbRVITg8MfhTIzjculrX+1zPPrVDj8azYuVlbRkMK23W8Cr7kX9axWSLlR6mP2dllDxHsqb+Sr972NRPtElowraPipt/GOO8Vh7g+lQsBPFLtTExuoLRiIQsd940PeAeshNuOvKkYVLHCqTfM7NbkplJ/zEj/AACuZY7bEseMlxCHx9+8g8ixZfTKQOouK0UbPOlkcao7H/wnhP8Aoj3b86Ksp/8AVqL/AKD+9CjwzT8TP8z+pncAwCkBdO8L36l8/wDtVRFhO+xs8x+CLXoXVAFHoRf0HOr5dlJGJGDMSxuAT8PBUXkL0eFjEatG4y3DG43MSNSDxrCM9LdnTPHjzwTwqpLlefxX3MXt1/Dho/sYaK45MwLH7xUANYWpDl3ZnYcdelgoA+4UlX8Qv+r7j91dK4POcWnTHlOtJ2dMsKSWyvIMjC4uikMVuPtMM4PLztT8sBA6W/8ANVN8rH1HmpH5GmCEyyMzFmJZibknUk1I2ebOGOojBe3C66qPVso9ajUatYEc9D5XB+8D2oKCYk6nUnUnmTvNPRz5RcaNYqv8oPxH+o6i/U9KYoUxhWqXhIZZAUj0UfGbhUA5yMdAPM+WtRaW0hICknKNy8AedufWkBeYHFxYe64eRe8Px4tgQqDiMOhGZjwzkX5Bd9NYnbmWMwYbMiMbySsf30x4lyPhXf4QfMm5qltSlW9BND+zNmy4iVIYULyObKo+ZN9AANSTuruPZ76N4MDhJJJmVsUY2JnKq6Qab4lcWNvtEXPSqP6CY8LnlOe+KsQEIItFpmKk6Nc2vysOddU7R4Bp8LNCvxPGyi+mpBArOUt6KSOA4f6RsXExyLhjrbOIBEzgbi3dMvtV3hfpkxAt3kCN1Viun99WPzrmuIUq7KRYgkEciDYj3pur0oDuGzfpew7fxUKeYYD0KZ7/AOFa2Gye1WFxGkcqlvshkdvZCWHqBXmAUq3Sk4IepnrUEEbwRx3EetVu18K86GNDkiAvu1kIHhUD6qA2N+JA4anzps3tHioSO7xEq23AsWW3IBrgelq3/Z36WnUhMYhYfbTW3Wx1tz1Y66WtYy4NcD13yWcEWUgjeu4mxt110HPzq4i2VKbyklGIN5nPiAO+xOoJGl9/lxgYntbhIVEsQEztqH1yAnflHCxNhxrIS9qMRtHEJCGbKTdstgscY+JgDxtuvxI8q55ylPaH1PUw9NHBWXNSXZPdv0j/ADSNk+0cLChjjDTzt4Y9PCXNrWF91zv6HcKx+yMRJ+0BpbrldGsdLhXzZuoOQ2rdbK7NC4aOMLydib2ItvOpNiRfqedVnbXZy4RYpyxeRGN0ABBQqxObj8SgjnlI508OJQ9TPq/aM8kZQhaT5t7v7JfBC9k4/vMSBuKMVC8lRjl/XWueYyEyRo4HjCgEc7aEeYN/nV1hMX3O0I5B8DPY8iJUAv18Vvc1CeAxyvGfhJJU9frL+P8Ai5V1NnkcozXe+fsfyo60+ShT8QWlGoK338Nad7sNoRcbqQKcSuQ1TadowOwtkGdXJFlbEJG3A5I0kZ7HqSBeq3tJDfGTIi2AZVVR0RFUD5CuhbGh7qJlW1+9ma/1QGkYg9dLaDlwrHdnYu/2nIxJYI0jknjl8K7t3iKn0raLCcnJuUuSvgZonOGxClWFrX67hcfIio21MGBIL6Bha/K+gJ8mI9CKsvpL/tg/7Kfe9UkW0mbIkpzIDYkjxBSCp14gA3110GtXHdWQ0+URJIypysLEW08xf7jSanbTQhtdTYKT/NGAvzXIfWmsXgmQAncba9bC49CbVZSmmRqKjApRjoNVjk90hFHQtRUEtNB0p3vwsOQ/HmaTQoEWOwtuTYORpcOwVzGyZiLlQ1rlb6BtN9Fgdu4qF2kixMyO3xMJGux5tc+L1quoUqCh3E4hpHaR2zO5LMxtdmOpJtxJpCLc2FTNk4FZWys0g0vljjMrtzsLgDzJrqHZvYTYZJpsPgUWaFFdZMY/eyNmJtljjypFoG1vfQColNRNceGc+ETfo/8Ao4gGFebaUS2axUOxjMa21YsCCt+XSqDtBgOz6SoIcVOBmIcRAzR2IIBV2HBsp0LXAItc3HQO1OzMPjC0c0rzSLFdYw1olkJCqQBpmuRvuetSpOyEb92siILYaSFnQBbE5FRlFt+XP5XrPW7N/wANFRvJKr7V8/gcT2z2ceFBMrJPhmNlxMRvHfgHB8UT/wArcTa5qhljIAJ3G9m5lfiHmLjTqOddN2l2XxOzIxiI2Uh80c0Zs0Ui5mCh1PxIya23rc61iNu4dYbiIH9nxAzohNzDLG1mW51JW5W/FJBxrWM72Znm6Z4464vVG6v4+X97FNHMy3ANgd4/Hz61076Edn55MROygqqrELi+pOdv9Ke9ZXZPY558HNjWkEUcSMVJBPeMmrDTcPq3118qqMPt3FRwHCRSGOJ2ZnCeFnJVc2Zt+UBbWBAsNb05U+DBye19jr/bf6To8KphwYWaUHKZN8MRtuuNHf8AlGg47rVU47HiWOCUm5nVWJJuS6oza9bM/wDgrP7J2KgwYhkX+J4m5qx+G3IqLexp7ZeHaOIQub92xytzW91I5aEgjoaz2Rm3YcuFzIY9xUeBuQGqe27060Qk7wXYWJOa32Wv+8XzD5vQjnUumigBJ57/ADta/naw9BSsRHyUKdo6QGhFKtekim5MUqMquQgc2VyQFzWJykn4TYEjgbEb7AxRZKRRurP9l9mGObEzn/myTAdFExA9yD8qvcBKJVzp4gGZTbWzISGGnUeoIPGmtlY2OWPPEcyAlc1iLkfERffqd9F0mIo8ZsZcRtLNILxxwRkr9olnyg9NDfytxrIdtEJx+IygmxBsBuCxKWPkACfSuqqgDZuNrE8xe49iT7mqXZuxg+Ix8rDWT90t+AaJCx9cy+1VGVAc+2RIHkijf4WZQD1U+D7yvk45VX4mcs7E/WYkjlc3/Ae1WsuzJIcGk2W4dnR7745EdgjLbcfCR6DpVLI5YljvJJPmTc10J2KMd7LHAwREKXexz2I3aXAA9RrfhVq+xl7trXBUk3+0tr29vnVBhmU3Di9+PEaMAR6nXyrUR4dlLCJsyFfhY3NyDmyt5WIB014UmbTnKLtMhbQ2IAyCMmzGxB1tYXvoN1r+3WoeL2K6yBB4s2qndoN9+Vqk4ja88ccLPEupDB7/ABADcQPgJB+dWWJ2tEJIswZSbghhlKBgNTfhcAX3b+VLcFnmudzPNsiXOUyEsBfTUWO433W0NFFsiViyiM3XQ7hY7+J10rYYfHwtIVSRC1huI1sW3HidfnS8JiVMsqX8SkG3MZF1HPl7UrE+pf5UYmHZkjMUVGLDeLbvO+6r/D9hMWY45jEFid1TOWWyZmyhn1uFvx6jnWiw6DvXt8WWPNz+va/pWxh2uThBhXCjMyLFrZnyyB304qqjfzIG+k2yo9T/ALbRQ92R7FHCxPEZFDzZss0YBIy5TGdRqN913e9TML2WE0U4xBLT96R3illS8du6Kre2W1rg31LdKtNkY6NhDGHDPHGMwBuVzaID1IB08udSMHFL3cqMyRzu0jApdwma4jbx/HYBSdAL3FqjSjVdTl3adPb9PsTr5lVrWJyG2lxqDY+VLza2twB97/lSIYLIqkk2tqzFibHiTqaXK4XUkDfqdBYC5J6C1MwOZ/S/hcRJhsPDGpkK5pZWG5RHGbkjgDdrHpauc7A7NTzzy4aYMv7Oruy6XEjBAq+bWX/DXcIMGcXKuJcMIluI1NgZBceI23wnKrANqTqbAC72A2VHDiMZiWsokMcjMdAFjiUEk8ACrH1oujbI6ioJ+vlZjvpCiWDBYXZUPxS2B/7cVmcn+qTL/mrGYTYKCR7i6ogiU/aJ8UzerMy+hqR/6w+P2jNjhpCo7qIEamMXItyJJzn+u1O7dxqwwu2cKcpCgWzF2va1+uu7nQ2+Dle5KkNNNWQ2Rt/EFsh/ek7rglgbbgE1a+gtXZ8O64LARSPCBiZFByuAWWVgC1+IVBw6AbzSaaCjDvEQASpAO4kEA2tu57xTbUuV2Z3kYlnY3LMSST1J4cgNAN1INIQ3Qo6FAF9JMqjMxCjmdAPM8KKfDRToA6pIh1F7MtxfUHnvqDgNv4WTJlnQFhcKxysLbw19FPnv4XrDptx8HiJ1wrpJCzkgEZkN+K2IOnw3BsbDfpTUWMd7UbNOCcLh5ZUjmUkoHYAFTYg2PiGo30OyHaT9lJjkBMLG+mpjbcWA4gi1x0BHI1O1tsS4lw8pBt8KgWVQbXC8eHEmmYlBrStqYpOtzqEvajCBCy4lL208Lsb8LqAD91O9m9uHEYeSfuwuQnMqNmJyqLmxAtcAWBPrXLe55UTxEA2JF9CAbXHI86nw0SsiZ0THdpNny4aaPNoyse7ZXQlm8alTlOpaxvrvvXLwNL/q9GRSonKm+h5g6gjkf15VpGGk0EA1b7D2r3TWb4CbnoeY6W3j9GK2EV1LRHdqUPxrz/qH8w9QNLwhTKjJNUzcxPHLGLWZVZbdCjD8PkakY3DB2iZgCUbTTW2VtPK9j6Vg452AIBIB32JF7br231YLtyayjPfKb6ga9Cd5FJoXgt+6zX4rAwyOjuoLLf1+G1+dvxNPx4GEt3mRc9st7ACw1vbnrv5AVnP+JtB+78VxfXwka36jhUiPtSgb+G2Ww5Zg2t+NiLW9qimT4OTyL7DbPQSyEKP3gjY3A0PjQ2/w39a18Ww8I2GEwVTNCGnupytkBytGxTXUAtbnbrfnMfa1O9/hN3WQDeO8uCxvyt4rW9b8KnR9tyhtFB4GGWTM3iZLglRYWW9hrrpepbo1h0uaT2idogw0N8NJHGq3BUAeEKpRn3DQkMttd2Y86tSBmHOx9rr/ALVyPs92rx008XdIhCgxpBYkWaxLud9wQDfQWFrb60m1toNhXM+IxeeUxiMxoe7w6EeK5+Js17my3c33W3RqOufs/LjrxGlavn+16vY1O29rR4eIySMN9gBa5PGw6C5PQVlsfttMVjI8P9TeIiLM9gWLzX1SM2Fozq2hYAaHnGN2+AT3Fy5ZmM7ixBY3bukN8mv1mJbj4TVz9F2ynlxff65IsxdzxZlIAud51LE9OtaaXVsylPFjdY93+bhfJfd/TudkjGlca+l/t4kiHA4R8wJ/fyLuIB0iU8QTqSNLADW5ovpR+kcSo2DwTXjJKyzjc/OOPmvNuI0GhueS04Q7s52y12bt+eCMxx5cpJIJW5UnfbW3uDSJTLipc5Vc5AHhWw0Fr+fWoEaXIFdt+ibs5H3ZncBjfKt91xYk9d/31ey/2OfNOSajBbsg/RLsZML+1Y7EnL3SiMaEkZrM9gNWY/u1AGupHGj7SbZOIlMz3RBZUUn4VJsL20zEkX9BuArZ9p9jOYpO4XNnkjdkG85UZSQOO6M26HjWX2XsKd3BOFLqDcrNmhjbkGJXMRfgFbqLXrCUrZqk6SZWps9zF39gsRNldjYObE2Qb20B1At1qAGvwPqLVr9p7L2tiZf30eFWFQe7WORrJzvdMzk2AvYAW3C5rO7V2bLh2CzIVvfKdCrW+yRp6b+lAONEChRd4KFBJzSjqz2xsKbDuylGZF1EiqSuXgSQLKeYNVqGui7NAqUrWo2IpFADySmg8pNNUKKJ0K7ATQoUKZQBvH614VIiyPoxytwf6p6Py/qHrzEYmnsXHldhwvp5EAj5GgloRNCyMVYEEcOnAjgR1GhpFS8PjLL3ci501sNzITvMbcOqm4PLjUeVQDobjgd3uOB/WtAKTumErmnFmtwpmipUbxzTjwyf+2r9j5/7Uf8A6kR8Kr63NQL1puwPZV9oYkRi4iSzTPyS/wAI/mbUD1PCpcYrk6P8hn7OvRL+DdfRP2axeIMeLnlKYVScsI8IxFrjxBbAxhvtXvltu1qr7eY8T4qQrbIhyRgAABFvawGgG8+tdyhgVEWNAERVCqo0CqBYAcrCuKba2KmHzTYl8kSsRcfHIw+pED8THnuA1NTGSs5Ms5zdydv4lPsXYnfZnd1hgj1lnf4UHIfac8FGpvTfaftoZYxs/Z6mHCfCT/zcQTvaQjcp+zxG/kKHtB2hkxWVMoigj/hwKSVU/aY73kPFjzNrU72UwGd853DQefE+331b82QkO7c2T3WEicbu8KeZyZifu96zldL+k+ARYDApxeSWQ/4VA+RWuaXoi7RQ7Ada7n9E+LzQxIPqJKx82mYf6VX3rg4a1db+iWfFQI0smHCYYr/aJpBCo1v4cwu4N940031ORbCSWqzslFWXg7fYOSQQws80jEALEpYG/wDM2Vbdb1b7Y2suHheaSyIguzHXoFUcWJsAOJIrCi6Fba2tDhYjLM2VdwH1mP2VHE/o1ynafaKXHuXYZYYye7jH2rWLMfrNY25amsx2j2/LjJjI5JLGyJwRSdFX8TxNX2FhWONY7jQa9T9Y+96txUVuTUpe6rGclHUnuvOipakT4U/J/QuFPOuRbc2ecPO8R0AN0PND8JHPTTzBrr4Wq/EQscXAzIpRUlyvvIkbLoeXhU2/vU4SoS2OQ5qMGu1S7MiaUTNGpcLlzEA6XBB14i2/fWQ+kHs6FH7XEtgT+9UbrnQSDlc6HqQedaLJbHZhaFChWhQKFChSAFSMZ9RvtRp7rdD/AKaj0+xvGv8AKzD0YZh81egljFFR0VMYAL+dFR07HKB8SK/nmB91I+d6AGa3P0Q7Wmhx8cUZJSY5ZE4EAEhuhXU35XrJriov/wAdT/7kv/8AVTtmdpZcMzPhUigdhl7xQzyBeIUyswW/MAGk91QHortf2sw+z4u8ma7m/dwg+OQ9OS82Og87A+ce03aGfHTmedrnciD4I1+yg/HeeNQMbjJJnMk0jyOd7uxZj6nh0ptEvUwhQ92HFGSbCukdk9m5VVQNTYeZP5msnsHA5nBtoK3cO2EweSeSGWRQ1hkKKqspsO8zAnUjS1hu51M32RWyI/09WV8FENyRSW941/8AjWI2B2RxuMI7iByp/wCawKRAc8zaH0ua7d2S7Q4Tacru2FCzQhcrS5JDlYt/DJHhsRqABvFbSRwoJJAAFyTuAG8+VqnW4qhcs47tLZ0Wyoo4Y0gfFZbvOYg5F77jJm1uDawFgBprWB7Q7XmxEl55XlYcWJOXoo3L6VY9qu137ViZ5VHgLARC31VGUM3U2DetqzUJN8x53v1rSKpWxRjqlRtPotWNMS+MncRw4WMszEm2Z7oi6fET4rLvJApntx21k2lKFQFMOh/dx8WO7PJb62ug4X8zWYxckhTKCe7zFrDcW3Bm6gaDlc23mi2JJlmQ9R94oq9ysuNwdM2+wez+UmR96iwH8xF2PsQPereTBjh91T8Cv7mM/aQMfNhc/M0UgrkmrlbOvB1ebFj046SXel9yv/YhzNFU21HRRn+Nz/mZKVKWFp1UpQWrOWhtVo58MsiNE/wupVvJhY/fTuSoe3NqJhYWnkBIFgFG9mO5Rfd58ADv3UlZpOMauJxHE4do3aNviRmVvNSQfmKbqfjMWMRNLK4CGR2ew1ALEkDX76hPERvFdSY/DelSQmhRUdMzBTkTaMvMX9VN/uze9N0FNAmChS4qDLTKraxFCl5KRagGqBQoUuOO9ARi3wEiXqdh4eFO4fBE20qbhobG1TY5yUVSLzYOHCgVebWjH7DPf/pMf71rr/mtVXgDa1R+2O21EP7MpuzFS9vqqpBAPUkDTkOorHdyEtkZ7Z+1XgbvIzZluR1I4G28V0L6VvpBRo2wOFYMWFp5F1UDjEh4k7mO4C43k25K701Wzim7JBTkbaim6ANMqLpl7iNpAwiM33Aew4dbgVUYdrMOFNE1Zdm9mjE4qKFjZWY5ju8KqXYX4XVSL9alRUUb9T1Ms7V9jqvZ9i+EhJ0unyubelrVJaOlNtTDA92kiMVsMkV5CvAAiMHKPOpDR1zNGDk2q7ELJQp/uz096FSTRNCUYjqSsVRdr7Shwqd5O4UcBvZjyUDUmrLaHBHWL+llSMLF/wB4f/rkt+NU23/pGmkuuGHcJz0aU+Z3J5DXrWLknZ87uzMxtdmJYnXiTqa1jBrdmbY0K6z9GmzsBisO0c5USj6pNiRrqp9tOFr8a5LTkUxXUG1LPh8WNXR19L1LxWrq+65RadqtljDYmSIEEKdCDe43g6dLVUU+Zc58R1503JGRvrSFpJPkWdKcnOC2EUKFCrOdqgA04XuKboUDUmhQenRGWF6ZW3GpsLcRY9OFAtXmRu5NXOx8Fc61LwAjkGgsw3r+I5irLDwhazlIWprZElYlVb20A+Qqs2bhWkmjjVSzO48I+trcjTcN9zwAJ4Vodn7CxOL8ECeG9mkY5Y16X4noATztetbi5MLsHCLI6ibFPmVTazSNvaxN8kQ8N7dN5NZpjrzK/tz2Ww2EiaYYh4FJsqEhrt9lLgux6Xv1ri08oJOW9r723nqetTNv7fxGNlM2JkLtrlG5EB+qi7lHzNtb1W1rGNciATRUpUJ3ClOlvOqK0Or7DdHQtTkEOY2phCLlJRQUUZY2FOYxVAKjXrztU3GZYrotieY3enSq4AmpT1bnVmjHAnj5l3fl8Dv2xtjLhcPDAEyEIpOn8RyAXa/E34bwLcLU88NY5vpWxDoEfC4d9BmvnsSOIF/D87c6u+x21sXiic2G/da2fNqv8oLfxOXMcSawlB8nLGnsWXc0VXn7A32G9qFZGnhjKVyD6Wv7d/7Cf6moUK1xe8ZTMJRr8Lf3fvNHQrpZAkUKOhSGGKtV/hepoqFZ5eEep7N5n6EKT4ajihQqocHN1XvL0Do6FCrOUAqRheNChQIs9j/x18m+4VqFoUKwy8jidm7Ff2DD/wDbH41y/wD/ANB/xcH/AETf6o6FCphyNnJaXFvoUK6R4/eRNi/D8BUM0KFTE6+r7fP7BVOwfwnzFHQpy4M+l/6fJ/sM4/4v1zNNxb6OhQvdM+p/6S9S6wG8V6J7L/2aP+lfuFFQrHLwZwLahQoVgWf/2Q=="
              alt="text"
              className="rounded-circle w-100"
            />
          </a>
          <ul
            className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="/">
                logout
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </li>
      </>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img
            src="https://en-news.tuj.ac.jp/wp-content/uploads/2023/04/tuj_news_logo.png"
            alt="temple Logo"
            className="d-inline align-left"
          />
          <p>
            <strong>
              <em>Owl Swap</em>
            </strong>
          </p>
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">{button}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
