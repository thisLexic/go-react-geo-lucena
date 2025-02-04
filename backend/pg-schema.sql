PGDMP     *                    y            pg-map-lucena     14.1 (Ubuntu 14.1-2.pgdg20.04+1)     14.1 (Ubuntu 14.1-2.pgdg20.04+1)                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16384    pg-map-lucena    DATABASE     d   CREATE DATABASE "pg-map-lucena" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_PH.UTF-8';
    DROP DATABASE "pg-map-lucena";
                postgres    false            �            1259    16396 	   area_edge    TABLE     �   CREATE TABLE public.area_edge (
    id bigint NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone NOT NULL,
    area_id bigint NOT NULL
);
    DROP TABLE public.area_edge;
       public         heap    postgres    false            �            1259    16395    AreaEdge_id_seq    SEQUENCE     z   CREATE SEQUENCE public."AreaEdge_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."AreaEdge_id_seq";
       public          postgres    false    212                       0    0    AreaEdge_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public."AreaEdge_id_seq" OWNED BY public.area_edge.id;
          public          postgres    false    211            �            1259    16414 	   area_risk    TABLE     �   CREATE TABLE public.area_risk (
    id bigint NOT NULL,
    risk_id bigint NOT NULL,
    area_id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.area_risk;
       public         heap    postgres    false            �            1259    16413    AreaRisk_id_seq    SEQUENCE     z   CREATE SEQUENCE public."AreaRisk_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."AreaRisk_id_seq";
       public          postgres    false    216                       0    0    AreaRisk_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public."AreaRisk_id_seq" OWNED BY public.area_risk.id;
          public          postgres    false    215            �            1259    16386    area    TABLE     �   CREATE TABLE public.area (
    id bigint NOT NULL,
    description character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.area;
       public         heap    postgres    false            �            1259    16385    Area_id_seq    SEQUENCE     v   CREATE SEQUENCE public."Area_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Area_id_seq";
       public          postgres    false    210                       0    0    Area_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public."Area_id_seq" OWNED BY public.area.id;
          public          postgres    false    209            �            1259    16405    risk    TABLE     �   CREATE TABLE public.risk (
    id bigint NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.risk;
       public         heap    postgres    false            �            1259    16404    Risk_id_seq    SEQUENCE     v   CREATE SEQUENCE public."Risk_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Risk_id_seq";
       public          postgres    false    214                       0    0    Risk_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public."Risk_id_seq" OWNED BY public.risk.id;
          public          postgres    false    213            q           2604    16389    area id    DEFAULT     d   ALTER TABLE ONLY public.area ALTER COLUMN id SET DEFAULT nextval('public."Area_id_seq"'::regclass);
 6   ALTER TABLE public.area ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            r           2604    16399    area_edge id    DEFAULT     m   ALTER TABLE ONLY public.area_edge ALTER COLUMN id SET DEFAULT nextval('public."AreaEdge_id_seq"'::regclass);
 ;   ALTER TABLE public.area_edge ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            t           2604    16417    area_risk id    DEFAULT     m   ALTER TABLE ONLY public.area_risk ALTER COLUMN id SET DEFAULT nextval('public."AreaRisk_id_seq"'::regclass);
 ;   ALTER TABLE public.area_risk ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            s           2604    16408    risk id    DEFAULT     d   ALTER TABLE ONLY public.risk ALTER COLUMN id SET DEFAULT nextval('public."Risk_id_seq"'::regclass);
 6   ALTER TABLE public.risk ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            x           2606    16401    area_edge AreaEdge_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.area_edge
    ADD CONSTRAINT "AreaEdge_pkey" PRIMARY KEY (id);
 C   ALTER TABLE ONLY public.area_edge DROP CONSTRAINT "AreaEdge_pkey";
       public            postgres    false    212            |           2606    16419    area_risk AreaRisk_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.area_risk
    ADD CONSTRAINT "AreaRisk_pkey" PRIMARY KEY (id);
 C   ALTER TABLE ONLY public.area_risk DROP CONSTRAINT "AreaRisk_pkey";
       public            postgres    false    216            v           2606    16391    area Area_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.area
    ADD CONSTRAINT "Area_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.area DROP CONSTRAINT "Area_pkey";
       public            postgres    false    210            z           2606    16410    risk Risk_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.risk
    ADD CONSTRAINT "Risk_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.risk DROP CONSTRAINT "Risk_pkey";
       public            postgres    false    214            }           2606    16420    area_edge area_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.area_edge
    ADD CONSTRAINT area_id FOREIGN KEY (area_id) REFERENCES public.area(id) NOT VALID;
 ;   ALTER TABLE ONLY public.area_edge DROP CONSTRAINT area_id;
       public          postgres    false    212    3190    210                       2606    16430    area_risk area_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.area_risk
    ADD CONSTRAINT area_id FOREIGN KEY (area_id) REFERENCES public.area(id) NOT VALID;
 ;   ALTER TABLE ONLY public.area_risk DROP CONSTRAINT area_id;
       public          postgres    false    210    216    3190            ~           2606    16425    area_risk risk_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.area_risk
    ADD CONSTRAINT risk_id FOREIGN KEY (risk_id) REFERENCES public.risk(id) NOT VALID;
 ;   ALTER TABLE ONLY public.area_risk DROP CONSTRAINT risk_id;
       public          postgres    false    3194    214    216           