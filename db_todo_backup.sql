-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-06-2022 a las 08:32:28
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_todo_prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `InLists`
--

CREATE TABLE `InLists` (
  `id_item` int(11) NOT NULL,
  `id_list` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `InLists`
--

INSERT INTO `InLists` (`id_item`, `id_list`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2022-05-31', '2022-05-31'),
(1, 2, '2022-05-31', '2022-05-31'),
(2, 1, '2022-05-31', '2022-05-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Items`
--

CREATE TABLE `Items` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `descrip` varchar(250) NOT NULL,
  `state` varchar(50) NOT NULL,
  `priority` varchar(50) NOT NULL,
  `deadline` date DEFAULT NULL,
  `resolutionDate` date DEFAULT NULL,
  `creationDate` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Items`
--

INSERT INTO `Items` (`id`, `title`, `descrip`, `state`, `priority`, `deadline`, `resolutionDate`, `creationDate`, `createdAt`, `updatedAt`) VALUES
(1, 'Item de prueba 1', 'descripcion 1', 'Sin resolver', 'Media', NULL, NULL, '2022-05-31', '2022-05-31', '2022-06-01'),
(2, 'Item de prueba  2', 'Descripcion 2', 'Resuelta', 'Alta', '2022-06-16', NULL, '2022-05-31', '2022-05-31', '2022-06-01'),
(3, 'sdfsd', 'sgsdgsd', 'Resolviendo', 'Media', NULL, NULL, '2022-06-01', '2022-06-01', '2022-06-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Lists`
--

CREATE TABLE `Lists` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `creationDate` date NOT NULL,
  `resolutionDate` date DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Lists`
--

INSERT INTO `Lists` (`id`, `title`, `state`, `creationDate`, `resolutionDate`, `createdAt`, `updatedAt`) VALUES
(1, 'Lista de prueba 1', 'Sin resolver', '2022-05-31', NULL, '2022-05-31', '2022-05-31'),
(2, 'Lista de prueba 2', 'Sin resolver', '2022-05-31', NULL, '2022-05-31', '2022-05-31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `InLists`
--
ALTER TABLE `InLists`
  ADD KEY `id_item` (`id_item`),
  ADD KEY `id_list` (`id_list`);

--
-- Indices de la tabla `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Lists`
--
ALTER TABLE `Lists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Items`
--
ALTER TABLE `Items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Lists`
--
ALTER TABLE `Lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `InLists`
--
ALTER TABLE `InLists`
  ADD CONSTRAINT `InLists_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `Items` (`id`),
  ADD CONSTRAINT `InLists_ibfk_2` FOREIGN KEY (`id_list`) REFERENCES `Lists` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
